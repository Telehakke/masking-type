import { LanguageEnum } from "./types";

export type Translation = {
    readonly maskBold: string;
    readonly maskItalic: string;
    readonly maskHighlight: string;
    readonly setForEachNote: string;
    readonly descriptionOfSetForEachNote: string;
    readonly maskAll: string;
    readonly maskOnlyBold: string;
    readonly maskOnlyItalic: string;
    readonly maskOnlyHighlight: string;
    readonly allNotMasked: string;
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
};

const translationEN: Translation = {
    maskBold: "Mask bold",
    maskItalic: "Mask italic",
    maskHighlight: "Mask highlight",
    setForEachNote: "Set for each note",
    descriptionOfSetForEachNote:
        "By copying a comment and pasting it at the beginning of the note, the setting of that comment takes precedence.",
    maskAll: "Mask all",
    maskOnlyBold: "Mask only bold",
    maskOnlyItalic: "Mask only italic",
    maskOnlyHighlight: "Mask only highlight",
    allNotMasked: "All not masked",
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
};

const translationJA: Translation = {
    maskBold: "太字を隠す",
    maskItalic: "斜体を隠す",
    maskHighlight: "ハイライトを隠す",
    setForEachNote: "ノートごとに設定する",
    descriptionOfSetForEachNote:
        "コメントをコピーし、ノートの先頭にペーストすることで、そのコメントの設定が優先されます",
    maskAll: "全て隠す",
    maskOnlyBold: "太字だけを隠す",
    maskOnlyItalic: "斜体だけを隠す",
    maskOnlyHighlight: "ハイライトだけを隠す",
    allNotMasked: "全て隠さない",
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
