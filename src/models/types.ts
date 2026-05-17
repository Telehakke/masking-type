import { isNotNull, isNumber } from "./typeGuard";

export const HintEnum = {
    none: "none",
    blur: "blur",
    peek: "peek",
} as const;

export type HintType = keyof typeof HintEnum;

export type Hint = Readonly<{
    type: HintType;
    value: number;
}>;

export const isHint = (value: unknown): value is Hint => {
    if (!isNotNull(value)) return false;
    if (!Object.keys(HintEnum).some((v) => v === value.type)) return false;
    if (!isNumber(value.value)) return false;
    return true;
};

/* -------------------------------------------------------------------------- */

export const DecorationEnum = {
    bold: "bold",
    italic: "italic",
    highlight: "highlight",
} as const;

export type NoteState = Readonly<{
    [DecorationEnum.bold]: boolean;
    [DecorationEnum.italic]: boolean;
    [DecorationEnum.highlight]: boolean;
}>;
