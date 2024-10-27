import { MarkdownView, Plugin, MarkdownViewModeType } from "obsidian";
import MaskingTypeSettingTab from "./views/maskingTypeSettingTab";
import {
    BoldElement,
    HighlightElement,
    ItalicElement,
} from "./models/HTMLElementOperator";
import PluginStateRepository from "./models/pluginStateRepository";
import PluginContext from "./models/pluginContext";
import JSONCommentParser from "./models/JSONCommentParser";
import { isNoteState, NoteState } from "./models/types";

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
            highlight: PluginContext.state.shouldMaskHighlights,
        };

        // 閲覧モードにおいて、太字、斜体、ハイライトを隠しつつ、
        // マスク部分を開閉する振る舞いを与える
        this.registerMarkdownPostProcessor((el, ctx) => {
            // ライブプレビューにおいて、テキストを隠す振る舞いを付与しない
            if (this.markdownViewMode() === "source") return;

            const info = ctx.getSectionInfo(el);
            if (info == null) return;

            const editor = this.app.workspace.activeEditor?.editor;
            if (editor == null) return;

            // ノートに設定コメントがあれば、その設定を優先する
            const result = new JSONCommentParser(editor).parse(
                info.lineStart,
                info.lineEnd
            );
            if (isNoteState(result)) {
                noteState.bold = result.bold;
                noteState.italic = result.italic;
                noteState.highlight = result.highlight;
            }

            if (noteState.bold) {
                this.boldElement.maskAll(el);
                this.boldElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint
                );
            }

            if (noteState.italic) {
                this.italicElement.maskAll(el);
                this.italicElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint
                );
            }

            if (noteState.highlight) {
                this.highlightElement.maskAll(el);
                this.highlightElement.addShowAndMaskBehaviorAll(
                    el,
                    PluginContext.state.selectedHint
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

        // ファイルが開かれたら状態を初期化する
        this.registerEvent(
            this.app.workspace.on("file-open", () => {
                this.elements = [];
                noteState.bold = PluginContext.state.shouldMaskBold;
                noteState.italic = PluginContext.state.shouldMaskItalic;
                noteState.highlight = PluginContext.state.shouldMaskHighlights;
            })
        );

        this.addSettingTab(
            new MaskingTypeSettingTab(
                this.app,
                this,
                this.pluginStateRepository
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
