import {
    MarkdownView,
    MarkdownViewModeType,
    moment,
    Platform,
    Plugin,
    TFile,
} from "obsidian";
import { Config } from "./models/config";
import {
    BoldElement,
    HighlightElement,
    ItalicElement,
} from "./models/HTMLElementManager";
import { LocalStorage } from "./models/localStorage";
import { PDFClozeTest } from "./models/PDFClozeTest";
import { getTranslation } from "./models/translator";
import { NoteState } from "./models/types";
import "./styles.css";
import MaskingTypeSettingTab from "./views/maskingTypeSettingTab";

const boldEl = new BoldElement();
const italicEl = new ItalicElement();
const highlightEl = new HighlightElement();
let elements: HTMLElement[] = [];

export default class MaskingTypePlugin extends Plugin {
    async onload(): Promise<void> {
        const pluginState = await LocalStorage.load(this);
        Config.store = Config.store.setPluginState(pluginState);
        Config.noteState = {
            bold: pluginState.shouldMaskBold,
            italic: pluginState.shouldMaskItalic,
            highlight: pluginState.shouldMaskHighlight,
        };
        const translation = getTranslation(moment.locale());
        const isMobile = Platform.isMobile;

        // ファイルが開かれたら実行する処理
        const handleFileOpen = (file: TFile | null): void => {
            elements = [];
            if (file == null) return;

            const property = this.app.metadataCache.getFileCache(file)
                ?.frontmatter as NoteState | undefined;
            Config.noteState = {
                bold: property?.bold ?? Config.store.shouldMaskBold,
                italic: property?.italic ?? Config.store.shouldMaskItalic,
                highlight:
                    property?.highlight ?? Config.store.shouldMaskHighlight,
            };

            if (Config.store.shouldSetClozeTestStyle) {
                PDFClozeTest.setStyles(Config.noteState);
            } else {
                PDFClozeTest.removeStyles();
            }
        };
        this.registerEvent(
            this.app.workspace.on("file-open", (file) => handleFileOpen(file)),
        );

        // 閲覧モードにおいて、太字、斜体、ハイライトを隠しつつ、
        // マスク部分を開閉する振る舞いを与える
        this.registerMarkdownPostProcessor((el) => {
            // ライブプレビューにおいて、
            // テーブルとコールアウトにテキストを隠す振る舞いを付与しない
            if (el.classList.contains("table-cell-wrapper")) return;
            if (el.classList.contains("markdown-rendered")) return;

            if (Config.noteState.bold) {
                boldEl.maskAll(el);
                boldEl.maskOrUnMaskOnClick(el, Config.store, isMobile);
            }
            if (Config.noteState.italic) {
                italicEl.maskAll(el);
                italicEl.maskOrUnMaskOnClick(el, Config.store, isMobile);
            }
            if (Config.noteState.highlight) {
                highlightEl.maskAll(el);
                highlightEl.maskOrUnMaskOnClick(el, Config.store, isMobile);
            }
            elements.push(el);
        });

        // 編集モードに切り替わったら、テキストを隠した状態にする
        const handleLayoutChange = (): void => {
            if (this.markdownViewMode() === "source") {
                elements.forEach((el) => {
                    if (boldEl.canMaskAll(el)) boldEl.maskAll(el);
                    if (italicEl.canMaskAll(el)) italicEl.maskAll(el);
                    if (highlightEl.canMaskAll(el)) highlightEl.maskAll(el);
                });
            }
        };
        this.registerEvent(
            this.app.workspace.on("layout-change", () => handleLayoutChange()),
        );

        this.addSettingTab(new MaskingTypeSettingTab(this, translation));
    }

    // エディタの現在の状態が、編集モード(source)か閲覧モード(preview)かを返す
    private markdownViewMode = (): MarkdownViewModeType | null => {
        const markdownView = this.app.workspace.activeEditor;
        if (!(markdownView instanceof MarkdownView)) return null;

        return markdownView.getMode();
    };
}
