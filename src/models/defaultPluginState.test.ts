import { expect, test } from "vitest";
import DefaultPluginState from "./defaultPluginState";
import { Hint, PluginState } from "./types";

test("デフォルトの値を取得できるかどうか", () => {
    const result = DefaultPluginState.copyWith({});

    expect(result).toEqual(DefaultPluginState.value);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか1", () => {
    const result = DefaultPluginState.copyWith({ language: "ja" });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        language: "ja",
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか2", () => {
    const result = DefaultPluginState.copyWith({ shouldMaskBold: false });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        shouldMaskBold: false,
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか3", () => {
    const result = DefaultPluginState.copyWith({ shouldMaskItalic: false });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        shouldMaskItalic: false,
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか4", () => {
    const result = DefaultPluginState.copyWith({ shouldMaskHighlights: false });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        shouldMaskHighlights: false,
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか5", () => {
    const hint: Hint = {
        type: "blur",
        value: 1,
    };
    const result = DefaultPluginState.copyWith({ selectedHint: hint });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        selectedHint: hint,
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか6", () => {
    const result = DefaultPluginState.copyWith({ blurStrength: 1 });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        blurStrength: 1,
    };
    expect(result).toEqual(expected);
});

test("デフォルトの値を一部置き換えた、新しい値を取得できるかどうか7", () => {
    const result = DefaultPluginState.copyWith({ peekingPercentage: 10 });

    const expected: PluginState = {
        ...DefaultPluginState.value,
        peekingPercentage: 10,
    };
    expect(result).toEqual(expected);
});
