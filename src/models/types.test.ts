import { expect, test } from "vitest";
import {
    Hint,
    HintEnum,
    isHint,
    isLanguage,
    isNoteState,
    isPluginState,
    LanguageEnum,
    NoteState,
    PluginState,
} from "./types";

test("Language型であるかどうかの判定1", () => {
    expect(isLanguage(LanguageEnum.en)).toBeTruthy();
});

test("Language型であるかどうかの判定2", () => {
    expect(isLanguage(LanguageEnum.ja)).toBeTruthy();
});

test("Language型であるかどうかの判定3", () => {
    expect(isLanguage("unknown")).toBeFalsy();
});

/* -------------------------------------------------------------------------- */

test("Hint型であるかどうかの判定1", () => {
    const value: Hint = {
        type: HintEnum.none,
        value: 0,
    };
    expect(isHint(value)).toBeTruthy();
});

test("Hint型であるかどうかの判定2", () => {
    const value: Hint = {
        type: HintEnum.peek,
        value: 0,
    };
    expect(isHint(value)).toBeTruthy();
});

test("Hint型であるかどうかの判定3", () => {
    const value: Hint = {
        type: HintEnum.blur,
        value: 0,
    };
    expect(isHint(value)).toBeTruthy();
});

test("Hint型であるかどうかの判定4", () => {
    expect(isHint(null)).toBeFalsy();
});

/* -------------------------------------------------------------------------- */

test("PluginState型であるかどうかの判定1", () => {
    const value: PluginState = {
        language: "en",
        shouldMaskBold: false,
        shouldMaskItalic: false,
        shouldMaskHighlights: false,
        selectedHint: { type: HintEnum.none, value: 0 },
        blurStrength: 0,
        peekingPercentage: 0,
    };
    expect(isPluginState(value)).toBeTruthy();
});

test("PluginState型であるかどうかの判定2", () => {
    const value = null;
    expect(isPluginState(value)).toBeFalsy();
});

/* -------------------------------------------------------------------------- */

test("NoteState型であるかどうかの判定1", () => {
    const value: NoteState = {
        bold: false,
        italic: false,
        highlight: false,
    };
    expect(isNoteState(value)).toBeTruthy();
});

test("NoteState型であるかどうかの判定2", () => {
    const value = null;
    expect(isNoteState(value)).toBeFalsy();
});
