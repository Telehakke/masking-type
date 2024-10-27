import { describe, expect, test } from "vitest";
import {
    BoldElement,
    HighlightElement,
    ItalicElement,
} from "./HTMLElementOperator";

const boldElement = new BoldElement();

const resetBody = (appended: HTMLElement): void => {
    document.body.innerHTML = "";
    document.body.appendChild(appended);
};

/* -------------------------------------------------------------------------- */

test("表示→非表示へと状態が変化するかどうか", () => {
    const element = document.createElement("strong");
    resetBody(element);

    boldElement.maskAll(document.body);

    expect(element.classList.value).toBe("mt-mask");
});

describe.each(["mt-blur-1", "mt-blur-2", "mt-blur-3", "mt-blur-4"])(
    "ぼかし→非表示へと状態が変化するかどうか",
    (v) => {
        test(v, () => {
            const element = document.createElement("strong");
            element.classList.add(v);
            resetBody(element);

            boldElement.maskAll(document.body);

            expect(element.classList.value).toBe("mt-mask");
        });
    }
);

describe.each([
    "mt-peek-10",
    "mt-peek-20",
    "mt-peek-30",
    "mt-peek-40",
    "mt-peek-50",
])("のぞき見→非表示へと状態が変化するかどうか", (v) => {
    test(v, () => {
        const element = document.createElement("strong");
        element.classList.add(v);
        resetBody(element);

        boldElement.maskAll(document.body);

        expect(element.classList.value).toBe("mt-mask");
    });
});

/* -------------------------------------------------------------------------- */

test("振る舞いを付与すると、データセットも付与されているかどうか", () => {
    const element = document.createElement("strong");
    resetBody(element);

    boldElement.addShowAndMaskBehaviorAll(document.body, {
        type: "none",
        value: 0,
    });

    expect(element.dataset.canMask).toBe("true");
});

describe("クリックしたときの状態変化をテスト", () => {
    const element = document.createElement("strong");
    resetBody(element);
    boldElement.addShowAndMaskBehaviorAll(document.body, {
        type: "none",
        value: 0,
    });

    test("クリックで非表示状態へと変化するかどうか", () => {
        element.click();

        expect(element.classList.value).toBe("mt-mask");
    });
    test("さらにクリックで表示状態へと変化するかどうか", () => {
        element.click();

        expect(element.classList.value).toBe("");
    });
});

describe.each([1, 2, 3, 4])(
    "クリックしたときの状態変化をテスト（ぼかしオプション付き）",
    (v) => {
        const element = document.createElement("strong");
        resetBody(element);
        boldElement.addShowAndMaskBehaviorAll(document.body, {
            type: "blur",
            value: v,
        });

        test(`クリックで非表示状態へと変化するかどうか（mt-blur-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe("mt-mask");
        });
        test(`さらにクリックでぼかし状態へと変化するかどうか（mt-blur-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe(`mt-blur-${v}`);
        });
        test(`さらにクリックで表示状態へと変化するかどうか（mt-blur-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe("");
        });
    }
);

describe.each([10, 20, 30, 40, 50])(
    "クリックしたときの状態変化をテスト（のぞき見オプション付き）",
    (v) => {
        const element = document.createElement("strong");
        resetBody(element);
        boldElement.addShowAndMaskBehaviorAll(document.body, {
            type: "peek",
            value: v,
        });

        test(`クリックで非表示状態へと変化するかどうか（mt-peek-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe("mt-mask");
        });
        test(`さらにクリックでぼかし状態へと変化するかどうか（mt-peek-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe(`mt-peek-${v}`);
        });
        test(`さらにクリックで表示状態へと変化するかどうか（mt-peek-${v}）`, () => {
            element.click();

            expect(element.classList.value).toBe("");
        });
    }
);

/* -------------------------------------------------------------------------- */

test("振る舞いを持つかどうかの判定1", () => {
    const element = document.createElement("strong");
    resetBody(element);

    boldElement.addShowAndMaskBehaviorAll(document.body, {
        type: "none",
        value: 0,
    });
    const result = boldElement.canMaskAll(document.body);

    expect(result).toBeTruthy();
});

test("振る舞いを持つかどうかの判定2", () => {
    const element = document.createElement("strong");
    resetBody(element);

    const result = boldElement.canMaskAll(document.body);

    expect(result).toBeFalsy();
});

/* -------------------------------------------------------------------------- */

test("斜体に対して動作するかどうか", () => {
    const italicElement = new ItalicElement();
    const element = document.createElement("em");
    resetBody(element);

    italicElement.maskAll(document.body);

    expect(element.classList.value).toBe("mt-mask");
});

test("ハイライトに対して動作するかどうか", () => {
    const highlightElement = new HighlightElement();
    const element = document.createElement("mark");
    resetBody(element);

    highlightElement.maskAll(document.body);

    expect(element.classList.value).toBe("mt-mask");
});
