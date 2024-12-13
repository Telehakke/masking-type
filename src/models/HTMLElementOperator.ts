import PluginContext from "./pluginContext";
import { Hint, HintEnum } from "./types";

class MaskClassName {
    static readonly className = "mt-mask";

    static add = (element: Element): void => {
        element.classList.add(this.className);
    };

    static remove = (element: Element): void => {
        element.classList.remove(this.className);
    };

    static contains = (element: Element): boolean => {
        return element.classList.contains(this.className);
    };

    static handleClick = (element: Element): void => {
        if (this.contains(element)) {
            this.remove(element);
            return;
        }
        this.add(element);
    };
}

/* -------------------------------------------------------------------------- */

class CanMaskDataset {
    static add = (element: HTMLElement): void => {
        element.dataset.canMask = "true";
    };

    static have = (element: HTMLElement): boolean => {
        return element.dataset.canMask === "true";
    };
}

/* -------------------------------------------------------------------------- */

class BlurClassName {
    static readonly blur1 = "mt-blur-1";
    static readonly blur2 = "mt-blur-2";
    static readonly blur3 = "mt-blur-3";
    static readonly blur4 = "mt-blur-4";

    static add = (element: Element, strength: number): void => {
        if (strength >= 4) {
            element.classList.add(this.blur4);
            return;
        }
        if (strength >= 3) {
            element.classList.add(this.blur3);
            return;
        }
        if (strength >= 2) {
            element.classList.add(this.blur2);
            return;
        }
        element.classList.add(this.blur1);
    };

    static remove = (element: Element): void => {
        element.classList.remove(
            this.blur1,
            this.blur2,
            this.blur3,
            this.blur4
        );
    };

    static contains = (element: Element): boolean => {
        return (
            element.classList.contains(this.blur1) ||
            element.classList.contains(this.blur2) ||
            element.classList.contains(this.blur3) ||
            element.classList.contains(this.blur4)
        );
    };

    static handleClick = (element: Element, strength: number): void => {
        if (MaskClassName.contains(element)) {
            MaskClassName.remove(element);
            this.add(element, strength);
            return;
        }
        if (this.contains(element)) {
            this.remove(element);
            return;
        }
        MaskClassName.add(element);
    };
}

/* -------------------------------------------------------------------------- */

class PeekClassName {
    static readonly peeked10 = "mt-peek-10";
    static readonly peeked20 = "mt-peek-20";
    static readonly peeked30 = "mt-peek-30";
    static readonly peeked40 = "mt-peek-40";
    static readonly peeked50 = "mt-peek-50";

    static add = (element: Element, percentage: number): void => {
        if (percentage >= 50) {
            element.classList.add(this.peeked50);
            return;
        }
        if (percentage >= 40) {
            element.classList.add(this.peeked40);
            return;
        }
        if (percentage >= 30) {
            element.classList.add(this.peeked30);
            return;
        }
        if (percentage >= 20) {
            element.classList.add(this.peeked20);
            return;
        }
        element.classList.add(this.peeked10);
    };

    static remove = (element: Element): void => {
        element.classList.remove(
            this.peeked10,
            this.peeked20,
            this.peeked30,
            this.peeked40,
            this.peeked50
        );
    };

    static contains = (element: Element): boolean => {
        return (
            element.classList.contains(this.peeked10) ||
            element.classList.contains(this.peeked20) ||
            element.classList.contains(this.peeked30) ||
            element.classList.contains(this.peeked40) ||
            element.classList.contains(this.peeked50)
        );
    };

    static handleClick = (element: Element, percentage: number): void => {
        if (MaskClassName.contains(element)) {
            MaskClassName.remove(element);
            this.add(element, percentage);
            return;
        }
        if (this.contains(element)) {
            this.remove(element);
            return;
        }
        MaskClassName.add(element);
    };
}

/* -------------------------------------------------------------------------- */

abstract class HTMLElementOperator {
    protected abstract readonly selector: string;

    /**
     * テキストを隠した状態にする
     */
    maskAll = (element: HTMLElement): void => {
        element
            .querySelectorAll(this.selector) //
            .forEach((v) => {
                MaskClassName.add(v);
                BlurClassName.remove(v);
                PeekClassName.remove(v);
            });
    };

    /**
     * クリックで表示・非表示の状態へと切り替える振る舞いを与える
     */
    addShowAndMaskBehaviorAll = (
        element: HTMLElement,
        hint: Hint,
        isMobile: boolean
    ): void => {
        element
            .querySelectorAll(this.selector) //
            .forEach((v) => {
                if (!(v instanceof HTMLElement)) return;

                CanMaskDataset.add(v);
                this.addClickEvent(v, hint);

                if (PluginContext.state.shouldDisplayOnMouseOver) {
                    this.addMouseoverEvent(v, hint, isMobile);
                }
            });
    };

    protected addClickEvent = (element: Element, hint: Hint): void => {
        element.addEventListener("click", (_) => {
            if (hint.type === HintEnum.blur) {
                BlurClassName.handleClick(element, hint.value);
                return;
            }
            if (hint.type === HintEnum.peek) {
                PeekClassName.handleClick(element, hint.value);
                return;
            }
            MaskClassName.handleClick(element);
        });
    };

    protected addMouseoverEvent = (
        element: HTMLElement,
        hint: Hint,
        isMobile: boolean
    ): void => {
        element.addEventListener("mouseover", (_) => {
            if (isMobile) return;

            if (hint.type === HintEnum.blur) {
                BlurClassName.handleClick(element, hint.value);
                return;
            }
            if (hint.type === HintEnum.peek) {
                PeekClassName.handleClick(element, hint.value);
                return;
            }
            MaskClassName.handleClick(element);
        });
    };

    /**
     * 表示・非表示の振る舞いが付与されているかどうかを返す
     */
    canMaskAll = (element: HTMLElement): boolean => {
        return Array.from(element.querySelectorAll(this.selector)) //
            .every((v) => {
                if (!(v instanceof HTMLElement)) return false;

                return CanMaskDataset.have(v);
            });
    };
}

/* -------------------------------------------------------------------------- */

export class BoldElement extends HTMLElementOperator {
    protected readonly selector = "strong";
}

export class ItalicElement extends HTMLElementOperator {
    protected readonly selector = "em";
}

export class HighlightElement extends HTMLElementOperator {
    protected readonly selector = "mark";
}
