import { describe, expect, it } from "vitest";
import {
    createPluginState,
    defaultPluginState,
    PluginState,
} from "../pluginState";
import { BlurStrength, PeekingPercentage } from "../validator";

describe("createPluginState", () => {
    it("完全な値が渡されると同じ値を返す", () => {
        const obj: PluginState = {
            shouldMaskBold: false,
            shouldMaskItalic: false,
            shouldMaskHighlight: false,
            selectedHint: { type: "blur", value: 1 },
            blurStrength: BlurStrength.MIN,
            peekingPercentage: PeekingPercentage.MIN,
            shouldDisplayOnMouseOver: true,
            shouldMaskOnMouseLeave: true,
            shouldSetClozeTestStyle: true,
        };
        const result = createPluginState(obj);
        expect(result).toEqual(obj);
    });

    it("不正な値が渡されるとデフォルト値を返す", () => {
        const result = createPluginState(null);
        expect(result).toEqual(defaultPluginState);
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す1", () => {
        const result = createPluginState({ shouldMaskBold: false });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldMaskBold: false,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す2", () => {
        const result = createPluginState({ shouldMaskItalic: false });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldMaskItalic: false,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す3", () => {
        const result = createPluginState({ shouldMaskHighlight: false });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldMaskHighlight: false,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す4", () => {
        const result = createPluginState({
            selectedHint: { type: "blur", value: 1 },
        });
        expect(result).toEqual({
            ...defaultPluginState,
            selectedHint: { type: "blur", value: 1 },
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す5", () => {
        const result = createPluginState({ blurStrength: BlurStrength.MIN });
        expect(result).toEqual({
            ...defaultPluginState,
            blurStrength: BlurStrength.MIN,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す6", () => {
        const result = createPluginState({
            peekingPercentage: PeekingPercentage.MIN,
        });
        expect(result).toEqual({
            ...defaultPluginState,
            peekingPercentage: PeekingPercentage.MIN,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す7", () => {
        const result = createPluginState({ shouldDisplayOnMouseOver: true });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldDisplayOnMouseOver: true,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す8", () => {
        const result = createPluginState({ shouldMaskOnMouseLeave: true });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldMaskOnMouseLeave: true,
        });
    });

    it("デフォルト値の一部のキーバリューを上書きした値を返す9", () => {
        const result = createPluginState({ shouldSetClozeTestStyle: true });
        expect(result).toEqual({
            ...defaultPluginState,
            shouldSetClozeTestStyle: true,
        });
    });
});
