import { describe, expect, test } from "vitest";
import {
    BoldElement,
    HighlightElement,
    ItalicElement,
} from "./HTMLElementOperator";

const boldElement = new BoldElement();

const appendToRoot = (appended: HTMLElement): HTMLElement => {
    const div = document.createElement("div");
    div.append(appended);
    return div;
};

/* -------------------------------------------------------------------------- */

test("表示→非表示へと状態が変化するかどうか", () => {
    const element = document.createElement("strong");
    const root = appendToRoot(element);

    boldElement.maskAll(root);

    expect(element.classList.value).toBe("mt-mask");
});

describe.each(["mt-blur-1", "mt-blur-2", "mt-blur-3", "mt-blur-4"])(
    "ぼかし→非表示へと状態が変化するかどうか",
    (v) => {
        test(v, () => {
            const element = document.createElement("strong");
            element.classList.add(v);
            const root = appendToRoot(element);

            boldElement.maskAll(root);

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
        const root = appendToRoot(element);

        boldElement.maskAll(root);

        expect(element.classList.value).toBe("mt-mask");
    });
});

/* -------------------------------------------------------------------------- */

test("振る舞いを付与すると、データセットも付与されているかどうか", () => {
    const element = document.createElement("strong");
    const root = appendToRoot(element);

    boldElement.addShowAndMaskBehaviorAll(
        root,
        {
            type: "none",
            value: 0,
        },
        false
    );

    expect(element.dataset.canMask).toBe("true");
});

describe("クリックしたときの状態変化をテスト", () => {
    const element = document.createElement("strong");
    const root = appendToRoot(element);

    boldElement.addShowAndMaskBehaviorAll(
        root,
        {
            type: "none",
            value: 0,
        },
        false
    );

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
        const root = appendToRoot(element);

        boldElement.addShowAndMaskBehaviorAll(
            root,
            {
                type: "blur",
                value: v,
            },
            false
        );

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
        const root = appendToRoot(element);

        boldElement.addShowAndMaskBehaviorAll(
            root,
            {
                type: "peek",
                value: v,
            },
            false
        );

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
    const root = appendToRoot(element);

    boldElement.addShowAndMaskBehaviorAll(
        root,
        {
            type: "none",
            value: 0,
        },
        false
    );
    const result = boldElement.canMaskAll(root);

    expect(result).toBeTruthy();
});

test("振る舞いを持つかどうかの判定2", () => {
    const element = document.createElement("strong");
    const root = appendToRoot(element);

    const result = boldElement.canMaskAll(root);

    expect(result).toBeFalsy();
});

/* -------------------------------------------------------------------------- */

test("斜体に対して動作するかどうか", () => {
    const italicElement = new ItalicElement();
    const element = document.createElement("em");
    const root = appendToRoot(element);

    italicElement.maskAll(root);

    expect(element.classList.value).toBe("mt-mask");
});

test("ハイライトに対して動作するかどうか", () => {
    const highlightElement = new HighlightElement();
    const element = document.createElement("mark");
    const root = appendToRoot(element);

    highlightElement.maskAll(root);

    expect(element.classList.value).toBe("mt-mask");
});
