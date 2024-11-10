import { beforeAll, describe, expect, test } from "vitest";
import PluginContext from "./pluginContext";
import DefaultPluginState from "./defaultPluginState";

describe("copyWith()メソッドのテスト", () => {
    beforeAll(() => {
        PluginContext.state = DefaultPluginState.value;
    });

    test("現在の状態のコピーを取得できるかどうか", () => {
        const state = PluginContext.copyWith({});
        expect(state).toEqual(DefaultPluginState.value);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか1", () => {
        const state = PluginContext.copyWith({ shouldMaskBold: false });
        const expected = DefaultPluginState.copyWith({ shouldMaskBold: false });
        expect(state).toEqual(expected);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか2", () => {
        const state = PluginContext.copyWith({ shouldMaskItalic: false });
        const expected = DefaultPluginState.copyWith({
            shouldMaskItalic: false,
        });
        expect(state).toEqual(expected);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか3", () => {
        const state = PluginContext.copyWith({ shouldMaskHighlight: false });
        const expected = DefaultPluginState.copyWith({
            shouldMaskHighlight: false,
        });
        expect(state).toEqual(expected);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか4", () => {
        const state = PluginContext.copyWith({
            selectedHint: {
                type: "blur",
                value: 1,
            },
        });
        const expected = DefaultPluginState.copyWith({
            selectedHint: {
                type: "blur",
                value: 1,
            },
        });
        expect(state).toEqual(expected);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか5", () => {
        const state = PluginContext.copyWith({ blurStrength: 1 });
        const expected = DefaultPluginState.copyWith({ blurStrength: 1 });
        expect(state).toEqual(expected);
    });

    test("現在の状態を一部置き換えた、新しい値を取得できるかどうか6", () => {
        const state = PluginContext.copyWith({ peekingPercentage: 10 });
        const expected = DefaultPluginState.copyWith({ peekingPercentage: 10 });
        expect(state).toEqual(expected);
    });
});
