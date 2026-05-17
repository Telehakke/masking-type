import {
    BlurClassName,
    getClassNameManager,
    MaskClassName,
    PeekClassName,
    UnmaskClassName,
} from "./classNameManager";
import { PluginState } from "./pluginState";
import { Hint } from "./types";

const addDataset = (el: HTMLElement): void => {
    el.dataset.canMask = "true";
};

const haveDataset = (el: HTMLElement): boolean => {
    return el.dataset.canMask === "true";
};

/* -------------------------------------------------------------------------- */

abstract class HTMLElementManager {
    protected abstract readonly selector: string;

    /** 指定した要素に含まれるテキストをマスクする */
    maskAll = (el: HTMLElement): void => {
        el.querySelectorAll(this.selector).forEach((v) => {
            v.classList.add(MaskClassName.className);
            BlurClassName.remove(v);
            PeekClassName.remove(v);
        });
    };

    /** マウス操作でマスク・アンマスクを切り替える振る舞いを与える */
    maskOrUnMaskOnClick = (
        el: HTMLElement,
        state: PluginState,
        isMobile: boolean,
    ): void => {
        el.querySelectorAll(this.selector).forEach((v) => {
            if (!v.instanceOf(HTMLElement)) return;

            addDataset(v);
            this.cycleClassNameOnClick(v, state.selectedHint);

            // マウスオーバーとマウスリーブのイベントは、
            // タッチデバイスで意図せず発動することがあるので以下は登録しない
            if (isMobile) return;

            if (state.shouldDisplayOnMouseOver) {
                this.cycleClassNameOnMouseOver(v, state.selectedHint);
            }

            if (state.shouldMaskOnMouseLeave) {
                this.maskOnMouseLeave(v);
            }
        });
    };

    protected cycleClassNameOnClick = (el: Element, hint: Hint): void => {
        el.addEventListener("click", () => this.handleClick(el, hint));
    };

    protected cycleClassNameOnMouseOver = (el: Element, hint: Hint): void => {
        el.addEventListener("mouseover", () => this.handleClick(el, hint));
    };

    protected handleClick = (el: Element, hint: Hint): void => {
        const className = getClassNameManager(el.classList).nextClassName(hint);
        MaskClassName.remove(el);
        BlurClassName.remove(el);
        PeekClassName.remove(el);
        if (className == null) return;
        el.classList.add(className);
    };

    protected maskOnMouseLeave = (el: Element): void => {
        el.addEventListener("mouseleave", () => {
            const classNameManager = getClassNameManager(el.classList);
            if (classNameManager.id !== UnmaskClassName.id) return;
            el.classList.add(MaskClassName.className);
        });
    };

    /** マスク・アンマスクの振る舞いが付与されているかどうかを返す */
    canMaskAll = (el: HTMLElement): boolean => {
        return Array.from(el.querySelectorAll(this.selector)).every((v) => {
            if (!v.instanceOf(HTMLElement)) return false;

            return haveDataset(v);
        });
    };
}

/* -------------------------------------------------------------------------- */

export class BoldElement extends HTMLElementManager {
    protected readonly selector = "strong";
}

export class ItalicElement extends HTMLElementManager {
    protected readonly selector = "em";
}

export class HighlightElement extends HTMLElementManager {
    protected readonly selector = "mark";
}
