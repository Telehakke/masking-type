import { Editor } from "obsidian";

export default class JSONCommentParser {
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    /**
     * ノートの行にJSONが書かれたコメントがあれば、オブジェクトに変換して返す
     */
    parse = (lineStart: number, lineEnd: number): object | null => {
        let result: any = null;
        for (let i = lineStart; i <= lineEnd; i++) {
            const line = this.editor.getLine(i);
            if (!this.isComment(line)) continue;

            const object = this.matchObject(line)?.[0];
            if (object == null) continue;

            try {
                result = JSON.parse(object);
                continue;
            } catch (error) {
                continue;
            }
        }
        return result;
    };

    private isComment = (src: string): boolean => {
        const result = src.match(/%.+%/);
        return result != null;
    };

    private matchObject = (src: string): RegExpMatchArray | null => {
        return src.match(/{.*?}/);
    };
}
