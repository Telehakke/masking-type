import { LanguageEnum } from "./types";

export type Translation = {
    readonly maskBold: string;
    readonly maskItalic: string;
    readonly maskHighlight: string;
    readonly setForEachNote: string;
    readonly descriptionOfSetForEachNote: string;
    readonly hint: string;
    readonly descriptionOfHint: string;
    readonly none: string;
    readonly blur: string;
    readonly peek: string;
    readonly blurStrength: string;
    readonly peekPercentage: string;
    readonly footer: string;
    readonly copySucceeded: string;
    readonly copyFailed: string;
    readonly displayOnMouseOver: string;
    readonly descriptionOfDisplayOnMouseOver: string;
    readonly pdfClozeTest: string;
    readonly descriptionPdfClozeTest: string;
};

const translationEN: Translation = {
    maskBold: "Mask bold",
    maskItalic: "Mask italic",
    maskHighlight: "Mask highlight",
    setForEachNote: "Set for each note",
    descriptionOfSetForEachNote:
        "Copy the property from the button and paste it into the beginning of the note. Next, check the item you want to hide.",
    hint: "Hint",
    descriptionOfHint: "Show a hint before displaying all.",
    none: "None",
    blur: "Blur",
    peek: "Peek",
    blurStrength: "Blur strength",
    peekPercentage: "Peek percentage",
    footer: "Reopening the note will reflect the change in settings.",
    copySucceeded: "Copy succeeded",
    copyFailed: "Copy failed",
    displayOnMouseOver: "Display on mouse over",
    descriptionOfDisplayOnMouseOver:
        "Hover the mouse pointer over the filled area to display the text. (desktop only)",
    pdfClozeTest: "PDF cloze test",
    descriptionPdfClozeTest:
        "Convert filled areas to cloze test when using Export to PDF. (desktop only)",
};

const translationJA: Translation = {
    maskBold: "太字を隠す",
    maskItalic: "斜体を隠す",
    maskHighlight: "ハイライトを隠す",
    setForEachNote: "ノートごとに設定する",
    descriptionOfSetForEachNote:
        "ボタンからプロパティをコピーし、ノートの先頭にペーストします。次に、隠したい項目にチェックを付けてください",
    hint: "ヒント",
    descriptionOfHint: "全て表示する前にヒントを表示します",
    none: "なし",
    blur: "ぼかし",
    peek: "のぞき見",
    blurStrength: "ぼかし強度",
    peekPercentage: "のぞき見の割合（%）",
    footer: "ノートを開き直すことで、設定の変更が反映されます",
    copySucceeded: "コピーしました",
    copyFailed: "コピーに失敗しました",
    displayOnMouseOver: "マウスオーバーで表示",
    descriptionOfDisplayOnMouseOver:
        "マウスポインタを塗りつぶし箇所に重ねることでテキストを表示します（デスクトップ専用）",
    pdfClozeTest: "PDFの穴埋め化",
    descriptionPdfClozeTest:
        "PDFにエクスポートを使用する際に、塗りつぶし箇所を穴埋め問題に変換します（デスクトップ専用）",
};

export class Translator {
    private static readonly translations: Map<string, Translation> = new Map([
        [LanguageEnum.en, translationEN],
        [LanguageEnum.ja, translationJA],
    ]);

    /**
     * 指定した言語の翻訳文を取得
     */
    static getTranslation = (language: string): Translation => {
        return this.translations.get(language) ?? translationEN;
    };
}
