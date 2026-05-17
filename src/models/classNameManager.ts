import { Hint, HintType } from "./types";

export type ClassNameManager = Readonly<{
    /** 識別値 */
    id: string;
    /** 自身の役割を持つクラス名を取得 */
    getClassName(value: number): string | undefined;
    /** 次の状態のクラス名を取得 */
    nextClassName(hint: Hint): string | undefined;
    /** 自身の役割を持つクラス名を要素から削除 */
    remove(el: Element): void;
    /** 自身の役割を持つクラス名が含まれるかどうか */
    contains(classList: DOMTokenList): boolean;
}>;

export const UnmaskClassName: ClassNameManager = {
    id: "empty",
    getClassName() {
        return undefined;
    },
    nextClassName(hint) {
        return nextMap[hint.type][this.id].getClassName(hint.value);
    },
    remove() {},
    contains() {
        return false;
    },
};

export const MaskClassName: ClassNameManager & Readonly<{ className: string }> =
    {
        id: "mask",
        className: "mt-mask",
        getClassName() {
            return this.className;
        },
        nextClassName(hint) {
            return nextMap[hint.type][this.id].getClassName(hint.value);
        },
        remove(el) {
            el.classList.remove(this.className);
        },
        contains(classList) {
            return classList.contains(this.className);
        },
    };

export const BlurClassName: ClassNameManager &
    Readonly<{ classNames: Record<number, string> }> = {
    id: "blur",
    classNames: {
        1: "mt-blur-1",
        2: "mt-blur-2",
        3: "mt-blur-3",
        4: "mt-blur-4",
    },
    getClassName(value) {
        if (value >= 4) {
            return this.classNames[4];
        } else if (value >= 3) {
            return this.classNames[3];
        } else if (value >= 2) {
            return this.classNames[2];
        } else {
            return this.classNames[1];
        }
    },
    nextClassName(hint) {
        return nextMap[hint.type][this.id].getClassName(hint.value);
    },
    remove(el) {
        el.classList.remove(...Object.values(this.classNames));
    },
    contains(classList) {
        return Object.values(this.classNames).some((v) =>
            classList.contains(v),
        );
    },
};

export const PeekClassName: ClassNameManager &
    Readonly<{ classNames: Record<number, string> }> = {
    id: "peek",
    classNames: {
        10: "mt-peek-10",
        20: "mt-peek-20",
        30: "mt-peek-30",
        40: "mt-peek-40",
        50: "mt-peek-50",
    },
    getClassName(value) {
        if (value >= 50) {
            return this.classNames[50];
        } else if (value >= 40) {
            return this.classNames[40];
        } else if (value >= 30) {
            return this.classNames[30];
        } else if (value >= 20) {
            return this.classNames[20];
        } else {
            return this.classNames[10];
        }
    },
    nextClassName(hint) {
        return nextMap[hint.type][this.id].getClassName(hint.value);
    },
    remove(el) {
        el.classList.remove(...Object.values(this.classNames));
    },
    contains(classList) {
        return Object.values(this.classNames).some((v) =>
            classList.contains(v),
        );
    },
};

const nextMap: Record<HintType, Record<string, ClassNameManager>> = {
    none: {
        [UnmaskClassName.id]: MaskClassName,
        [MaskClassName.id]: UnmaskClassName,
    },
    blur: {
        [UnmaskClassName.id]: MaskClassName,
        [MaskClassName.id]: BlurClassName,
        [BlurClassName.id]: UnmaskClassName,
    },
    peek: {
        [UnmaskClassName.id]: MaskClassName,
        [MaskClassName.id]: PeekClassName,
        [PeekClassName.id]: UnmaskClassName,
    },
};

/* -------------------------------------------------------------------------- */

export const getClassNameManager = (
    classList: DOMTokenList,
): ClassNameManager => {
    if (MaskClassName.contains(classList)) return MaskClassName;
    if (BlurClassName.contains(classList)) return BlurClassName;
    if (PeekClassName.contains(classList)) return PeekClassName;
    return UnmaskClassName;
};
