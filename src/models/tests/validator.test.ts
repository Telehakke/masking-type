import { describe, expect, it } from "vitest";
import { defaultPluginState } from "../pluginState";
import { BlurStrength, PeekingPercentage } from "../validator";

describe("peekingPercentage", () => {
    it("正常値が渡されたら同じ値を返す1", () => {
        const result = PeekingPercentage.ensure(
            PeekingPercentage.MIN,
            defaultPluginState.peekingPercentage,
        );
        expect(result).toBe(PeekingPercentage.MIN);
    });

    it("正常値が渡されたら同じ値を返す2", () => {
        const result = PeekingPercentage.ensure(
            PeekingPercentage.MAX,
            defaultPluginState.peekingPercentage,
        );
        expect(result).toBe(PeekingPercentage.MAX);
    });

    it("最小値より小さい値が渡されたら最小値を返す", () => {
        const result = PeekingPercentage.ensure(
            PeekingPercentage.MIN - 1,
            defaultPluginState.peekingPercentage,
        );
        expect(result).toBe(PeekingPercentage.MIN);
    });

    it("最大値より大きい値が渡されたら最大値を返す", () => {
        const result = PeekingPercentage.ensure(
            PeekingPercentage.MAX + 1,
            defaultPluginState.peekingPercentage,
        );
        expect(result).toBe(PeekingPercentage.MAX);
    });

    it("数値以外の値が渡されたらデフォルト値を返す", () => {
        const result = PeekingPercentage.ensure(
            null,
            defaultPluginState.peekingPercentage,
        );
        expect(result).toBe(defaultPluginState.peekingPercentage);
    });
});

describe("blurStrength", () => {
    it("正常値が渡されたら同じ値を返す1", () => {
        const result = BlurStrength.ensure(
            BlurStrength.MIN,
            defaultPluginState.blurStrength,
        );
        expect(result).toBe(BlurStrength.MIN);
    });

    it("正常値が渡されたら同じ値を返す2", () => {
        const result = BlurStrength.ensure(
            BlurStrength.MAX,
            defaultPluginState.blurStrength,
        );
        expect(result).toBe(BlurStrength.MAX);
    });

    it("最小値より小さい値が渡されたら最小値を返す", () => {
        const result = BlurStrength.ensure(
            BlurStrength.MIN - 1,
            defaultPluginState.blurStrength,
        );
        expect(result).toBe(BlurStrength.MIN);
    });

    it("最大値より大きい値が渡されたら最大値を返す", () => {
        const result = BlurStrength.ensure(
            BlurStrength.MAX + 1,
            defaultPluginState.blurStrength,
        );
        expect(result).toBe(BlurStrength.MAX);
    });

    it("数値以外の値が渡されたらデフォルト値を返す", () => {
        const result = BlurStrength.ensure(
            null,
            defaultPluginState.blurStrength,
        );
        expect(result).toBe(defaultPluginState.blurStrength);
    });
});
