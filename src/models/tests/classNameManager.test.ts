import { describe, expect, it } from "vitest";
import {
    BlurClassName,
    MaskClassName,
    PeekClassName,
    UnmaskClassName,
} from "../classNameManager";
import { Hint } from "../types";
import { BlurStrength, PeekingPercentage } from "../validator";

describe("type = none の場合の状態変化", () => {
    const hint: Hint = { type: "none", value: 0 };
    it("mt-mask -> empty", () => {
        const result = MaskClassName.nextClassName(hint);
        expect(result).toBe(UnmaskClassName.getClassName(hint.value));
    });

    it("empty -> mt-mask", () => {
        const result = UnmaskClassName.nextClassName(hint);
        expect(result).toBe(MaskClassName.getClassName(hint.value));
    });
});

describe("type = blur の場合の状態変化", () => {
    const hint: Hint = { type: "blur", value: BlurStrength.MIN };
    it("mt-mask -> mt-blur", () => {
        const result = MaskClassName.nextClassName(hint);
        expect(result).toBe(BlurClassName.getClassName(hint.value));
    });

    it("mt-blur -> empty", () => {
        const result = BlurClassName.nextClassName(hint);
        expect(result).toBe(UnmaskClassName.getClassName(hint.value));
    });

    it("empty -> mt-mask", () => {
        const result = UnmaskClassName.nextClassName(hint);
        expect(result).toBe(MaskClassName.getClassName(hint.value));
    });
});

describe("type = peek の場合の状態変化", () => {
    const hint: Hint = { type: "peek", value: PeekingPercentage.MIN };
    it("mt-mask -> mt-peek", () => {
        const result = MaskClassName.nextClassName(hint);
        expect(result).toBe(PeekClassName.getClassName(hint.value));
    });

    it("mt-peek -> empty", () => {
        const result = PeekClassName.nextClassName(hint);
        expect(result).toBe(UnmaskClassName.getClassName(hint.value));
    });

    it("empty -> mt-mask", () => {
        const result = UnmaskClassName.nextClassName(hint);
        expect(result).toBe(MaskClassName.getClassName(hint.value));
    });
});

describe("blurClassName", () => {
    it("mt-blur-1", () => {
        const result = BlurClassName.getClassName(1);
        expect(result).toBe(BlurClassName.classNames[1]);
    });

    it("mt-blur-2", () => {
        const result = BlurClassName.getClassName(2);
        expect(result).toBe(BlurClassName.classNames[2]);
    });

    it("mt-blur-3", () => {
        const result = BlurClassName.getClassName(3);
        expect(result).toBe(BlurClassName.classNames[3]);
    });

    it("mt-blur-4", () => {
        const result = BlurClassName.getClassName(4);
        expect(result).toBe(BlurClassName.classNames[4]);
    });
});

describe("peekClassName", () => {
    it("mt-peek-10", () => {
        const result = PeekClassName.getClassName(10);
        expect(result).toBe(PeekClassName.classNames[10]);
    });

    it("mt-peek-20", () => {
        const result = PeekClassName.getClassName(20);
        expect(result).toBe(PeekClassName.classNames[20]);
    });

    it("mt-peek-30", () => {
        const result = PeekClassName.getClassName(30);
        expect(result).toBe(PeekClassName.classNames[30]);
    });

    it("mt-peek-40", () => {
        const result = PeekClassName.getClassName(40);
        expect(result).toBe(PeekClassName.classNames[40]);
    });

    it("mt-peek-50", () => {
        const result = PeekClassName.getClassName(50);
        expect(result).toBe(PeekClassName.classNames[50]);
    });
});
