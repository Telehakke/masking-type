import { NoteState } from "./types";

/* -------------------------------- property -------------------------------- */
const PRINT_STRONG = "mt-print-strong";
const PRINT_EM = "mt-print-em";
const PRINT_MARK = "mt-print-mark";
const COLOR = "color";
const BORDER = "border";
const OPACITY = "opacity";
const BG = "background-color";

/* ---------------------------------- value --------------------------------- */
const TRANSPARENT = "transparent";
const SOLID_LINE = "1px solid black";
const ZERO = "0";

// CSSカスタムプロパティを<body>要素に登録する
const setProperty = (property: string, value: string): void => {
    activeDocument.body.style.setProperty(property, value);
};

// CSSカスタムプロパティを<body>要素から削除する
const removeProperty = (property: string): void => {
    activeDocument.body.style.removeProperty(property);
};

export class PDFClozeTest {
    /** PDFエクスポートでの塗りつぶし箇所の穴埋め化 */
    static readonly setStyles = (noteState: NoteState): void => {
        this.removeStyles();
        const { bold, italic, highlight } = noteState;
        if (bold) {
            activeDocument.body.classList.add(PRINT_STRONG);
            setProperty(`--${PRINT_STRONG}-${COLOR}`, TRANSPARENT);
            setProperty(`--${PRINT_STRONG}-${BORDER}`, SOLID_LINE);
            setProperty(`--${PRINT_STRONG}-${OPACITY}`, ZERO);
        }
        if (italic) {
            activeDocument.body.classList.add(PRINT_EM);
            setProperty(`--${PRINT_EM}-${COLOR}`, TRANSPARENT);
            setProperty(`--${PRINT_EM}-${BORDER}`, SOLID_LINE);
            setProperty(`--${PRINT_EM}-${OPACITY}`, ZERO);
        }
        if (highlight) {
            activeDocument.body.classList.add(PRINT_MARK);
            setProperty(`--${PRINT_MARK}-${COLOR}`, TRANSPARENT);
            setProperty(`--${PRINT_MARK}-${BORDER}`, SOLID_LINE);
            setProperty(`--${PRINT_MARK}-${BG}`, TRANSPARENT);
            setProperty(`--${PRINT_MARK}-${OPACITY}`, ZERO);
        }
    };

    /** 穴埋め化のスタイルを削除 */
    static readonly removeStyles = (): void => {
        activeDocument.body.classList.remove(PRINT_STRONG);
        removeProperty(`--${PRINT_STRONG}-${COLOR}`);
        removeProperty(`--${PRINT_STRONG}-${BORDER}`);
        removeProperty(`--${PRINT_STRONG}-${OPACITY}`);

        activeDocument.body.classList.remove(PRINT_EM);
        removeProperty(`--${PRINT_EM}-${COLOR}`);
        removeProperty(`--${PRINT_EM}-${BORDER}`);
        removeProperty(`--${PRINT_EM}-${OPACITY}`);

        activeDocument.body.classList.remove(PRINT_MARK);
        removeProperty(`--${PRINT_MARK}-${COLOR}`);
        removeProperty(`--${PRINT_MARK}-${BORDER}`);
        removeProperty(`--${PRINT_MARK}-${BG}`);
        removeProperty(`--${PRINT_MARK}-${OPACITY}`);
    };
}
