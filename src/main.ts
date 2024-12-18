import {
    MarkdownView,
    Plugin,
    MarkdownViewModeType,
    moment,
    Platform,
} from "obsidian";
import MaskingTypeSettingTab from "./views/maskingTypeSettingTab";
import {
    BoldElement,
    HighlightElement,
    ItalicElement,
} from "./models/HTMLElementOperator";
import PluginStateRepository from "./models/pluginStateRepository";
import PluginContext from "./models/pluginContext";
import { NoteState, NoteStateKey } from "./models/types";
import { Translator } from "./models/translator";
import PDFClozeTest from "./models/PDFClozeTest";

export default class MaskingTypePlugin extends Plugin {
    private readonly pluginStateRepository = new PluginStateRepository(this);
    private readonly boldElement = new BoldElement();
    private readonly italicElement = new ItalicElement();
    private readonly highlightElement = new HighlightElement();
    private elements: HTMLElement[] = [];

    async onload(): Promise<void> {
        PluginContext.state = await this.pluginStateRepository.load();
        const noteState: NoteState = {
            bold: PluginContext.state.shouldMaskBold,
            italic: PluginContext.state.shouldMaskItalic,
            highlight: PluginContext.state.shouldMaskHighlight,
        };
        const translation = Translator.getTranslation(moment.locale());
        const isMobile = Platform.isMobile;

        // 閲覧モードにおいて、太字、斜体、ハイライトを隠しつつ、
        // マスク部分を開閉する振る舞いを与える
        this.registerMarkdownPostProcessor((el) => {
            // ライブプレビューにおいて、
            // テーブルとコールアウトにテキストを隠す振る舞いを付与しない
            if (el.classList.contains("table-cell-wrapper")) return;
            if (el.classList.contains("markdown-rendered")) return;

            if (noteState.bold) {
                this.boldElement.maskAll(el);
                this.boldElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint,
                    isMobile
                );
            }

            if (noteState.italic) {
                this.italicElement.maskAll(el);
                this.italicElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint,
                    isMobile
                );
            }

            if (noteState.highlight) {
                this.highlightElement.maskAll(el);
                this.highlightElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint,
                    isMobile
                );
            }

            this.elements.push(el);
        });

        // 編集モードに切り替わったら、テキストを隠した状態にする
        this.registerEvent(
            this.app.workspace.on("layout-change", () => {
                if (this.markdownViewMode() === "source") {
                    this.elements.forEach((v) => {
                        if (this.boldElement.canMaskAll(v)) {
                            this.boldElement.maskAll(v);
                        }

                        if (this.italicElement.canMaskAll(v)) {
                            this.italicElement.maskAll(v);
                        }

                        if (this.highlightElement.canMaskAll(v)) {
                            this.highlightElement.maskAll(v);
                        }
                    });
                }
            })
        );

        // ファイルが開かれたら呼ばれる関数
        this.registerEvent(
            this.app.workspace.on("file-open", (file) => {
                this.elements = [];
                if (file == null) return;

                // ノートにプロパティがあれば、その設定を優先する
                const frontmatter =
                    this.app.metadataCache.getFileCache(file)?.frontmatter ??
                    {};
                noteState.bold =
                    frontmatter[NoteStateKey.bold] ??
                    PluginContext.state.shouldMaskBold;
                noteState.italic =
                    frontmatter[NoteStateKey.italic] ??
                    PluginContext.state.shouldMaskItalic;
                noteState.highlight =
                    frontmatter[NoteStateKey.highlight] ??
                    PluginContext.state.shouldMaskHighlight;

                if (PluginContext.state.shouldSetClozeTestStyle) {
                    PDFClozeTest.setStyles(noteState);
                } else {
                    PDFClozeTest.unsetStyles();
                }
            })
        );

        this.addSettingTab(
            new MaskingTypeSettingTab(
                this.app,
                this,
                this.pluginStateRepository,
                translation
            )
        );
    }

    // エディタの現在の状態が、編集モードか閲覧モードかを返す
    private markdownViewMode = (): MarkdownViewModeType | null => {
        const markdownView = this.app.workspace.activeEditor;
        if (!(markdownView instanceof MarkdownView)) return null;

        return markdownView.getMode();
    };
}
