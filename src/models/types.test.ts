import { expect, test } from "vitest";
import {
    Hint,
    HintEnum,
    isHint,
    isNoteState,
    isPluginState,
    NoteState,
    PluginState,
} from "./types";

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
        shouldMaskBold: false,
        shouldMaskItalic: false,
        shouldMaskHighlight: false,
        selectedHint: { type: HintEnum.none, value: 0 },
        blurStrength: 0,
        peekingPercentage: 0,
        shouldDisplayOnMouseOver: false,
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
