import { NoteState } from "./types";

export default class PDFClozeTest {
    private static readonly mtPrintStrong = "--mt-print-strong-";
    private static readonly mtPrintEm = "--mt-print-em-";
    private static readonly mtPrintMark = "--mt-print-mark-";
    private static readonly transparent = "transparent";
    private static readonly inherit = "inherit";
    private static readonly solidLine = "1px solid black";
    private static readonly highlightBg = "var(--text-highlight-bg)";

    private static setProperty = (property: string, value: string): void => {
        document.body.style.setProperty(property, value);
    };

    /**
     * PDFエクスポートでの塗りつぶし箇所の穴埋め化
     */
    static setStyles = (noteState: NoteState): void => {
        this.setProperty(
            `${this.mtPrintStrong}color`,
            noteState.bold ? this.transparent : this.inherit
        );
        this.setProperty(
            `${this.mtPrintStrong}border`,
            noteState.bold ? this.solidLine : this.inherit
        );

        this.setProperty(
            `${this.mtPrintEm}color`,
            noteState.italic ? this.transparent : this.inherit
        );
        this.setProperty(
            `${this.mtPrintEm}border`,
            noteState.italic ? this.solidLine : this.inherit
        );

        this.setProperty(
            `${this.mtPrintMark}color`,
            noteState.highlight ? this.transparent : this.inherit
        );
        this.setProperty(
            `${this.mtPrintMark}background-color`,
            noteState.highlight ? this.transparent : this.highlightBg
        );
        this.setProperty(
            `${this.mtPrintMark}border`,
            noteState.highlight ? this.solidLine : this.inherit
        );
    };

    /**
     * デフォルトのスタイルに戻す
     */
    static unsetStyles = (): void => {
        this.setProperty(`${this.mtPrintStrong}color`, this.inherit);
        this.setProperty(`${this.mtPrintStrong}border`, this.inherit);

        this.setProperty(`${this.mtPrintEm}color`, this.inherit);
        this.setProperty(`${this.mtPrintEm}border`, this.inherit);

        this.setProperty(`${this.mtPrintMark}color`, this.inherit);
        this.setProperty(
            `${this.mtPrintMark}background-color`,
            this.highlightBg
        );
        this.setProperty(`${this.mtPrintMark}border`, this.inherit);
    };
}
