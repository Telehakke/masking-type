export const LanguageEnum = {
    en: "en",
    ja: "ja",
} as const;

export type Language = (typeof LanguageEnum)[keyof typeof LanguageEnum];

export const isLanguage = (value: any): value is Language => {
    if (value === LanguageEnum.en) return true;
    if (value === LanguageEnum.ja) return true;
    return false;
};

/* -------------------------------------------------------------------------- */

export const HintEnum = {
    none: "none",
    blur: "blur",
    peek: "peek",
} as const;

export type HintType = (typeof HintEnum)[keyof typeof HintEnum];

export type Hint = {
    readonly type: HintType;
    readonly value: number;
};

export const isHint = (value: any): value is Hint => {
    if (value == null) return false;
    if (
        value.type !== HintEnum.none &&
        value.type !== HintEnum.blur &&
        value.type !== HintEnum.peek
    )
        return false;
    if (typeof value.value !== "number") return false;
    return true;
};

/* -------------------------------------------------------------------------- */

export const PluginStateKey = {
    language: "language",
    shouldMaskBold: "shouldMaskBold",
    shouldMaskItalic: "shouldMaskItalic",
    shouldMaskHighlights: "shouldMaskHighlights",
    selectedHint: "selectedHint",
    blurStrength: "blurStrength",
    peekingPercentage: "peekingPercentage",
} as const;

export type PluginState = {
    readonly language: Language;
    readonly shouldMaskBold: boolean;
    readonly shouldMaskItalic: boolean;
    readonly shouldMaskHighlights: boolean;
    readonly selectedHint: Hint;
    readonly blurStrength: number;
    readonly peekingPercentage: number;
};

// prettier-ignore
export const isPluginState = (value: any): value is PluginState => {
    if (value == null) return false;
    if (!isLanguage(value[PluginStateKey.language])) return false;
    if (typeof value[PluginStateKey.shouldMaskBold] !== "boolean") return false;
    if (typeof value[PluginStateKey.shouldMaskItalic] !== "boolean") return false;
    if (typeof value[PluginStateKey.shouldMaskHighlights] !== "boolean") return false;
    if (!isHint(value[PluginStateKey.selectedHint])) return false;
    if (typeof value[PluginStateKey.blurStrength] !== "number") return false;
    if (typeof value[PluginStateKey.peekingPercentage] !== "number") return false;
    return true;
};

/* -------------------------------------------------------------------------- */

export const NoteStateKey = {
    bold: "bold",
    italic: "italic",
    highlight: "highlight",
} as const;

export type NoteState = {
    bold: boolean;
    italic: boolean;
    highlight: boolean;
};

export const isNoteState = (value: any): value is NoteState => {
    if (value == null) return false;
    if (typeof value[NoteStateKey.bold] !== "boolean") return false;
    if (typeof value[NoteStateKey.italic] !== "boolean") return false;
    if (typeof value[NoteStateKey.highlight] !== "boolean") return false;
    return true;
};
