import { isBoolean, isNotNull } from "./typeGuard";
import { Hint, isHint } from "./types";
import { BlurStrength, PeekingPercentage } from "./validator";

export type PluginState = Readonly<{
    shouldMaskBold: boolean;
    shouldMaskItalic: boolean;
    shouldMaskHighlight: boolean;
    selectedHint: Hint;
    blurStrength: number;
    peekingPercentage: number;
    shouldDisplayOnMouseOver: boolean;
    shouldMaskOnMouseLeave: boolean;
    shouldSetClozeTestStyle: boolean;
}>;

export const defaultPluginState: PluginState = {
    shouldMaskBold: true,
    shouldMaskItalic: true,
    shouldMaskHighlight: true,
    selectedHint: { type: "none", value: 0 },
    blurStrength: 2,
    peekingPercentage: 30,
    shouldDisplayOnMouseOver: false,
    shouldMaskOnMouseLeave: false,
    shouldSetClozeTestStyle: false,
};

/* -------------------------------------------------------------------------- */

export const createPluginState = (value: unknown): PluginState => {
    if (!isNotNull(value)) return defaultPluginState;

    const v = value as PluginState;
    return {
        shouldMaskBold: ensureBoolean(
            v.shouldMaskBold,
            defaultPluginState.shouldMaskBold,
        ),
        shouldMaskItalic: ensureBoolean(
            v.shouldMaskItalic,
            defaultPluginState.shouldMaskItalic,
        ),
        shouldMaskHighlight: ensureBoolean(
            v.shouldMaskHighlight,
            defaultPluginState.shouldMaskHighlight,
        ),
        selectedHint: ensureHint(
            v.selectedHint,
            defaultPluginState.selectedHint,
        ),
        blurStrength: BlurStrength.ensure(
            v.blurStrength,
            defaultPluginState.blurStrength,
        ),
        peekingPercentage: PeekingPercentage.ensure(
            v.peekingPercentage,
            defaultPluginState.peekingPercentage,
        ),
        shouldDisplayOnMouseOver: ensureBoolean(
            v.shouldDisplayOnMouseOver,
            defaultPluginState.shouldDisplayOnMouseOver,
        ),
        shouldMaskOnMouseLeave: ensureBoolean(
            v.shouldMaskOnMouseLeave,
            defaultPluginState.shouldMaskOnMouseLeave,
        ),
        shouldSetClozeTestStyle: ensureBoolean(
            v.shouldSetClozeTestStyle,
            defaultPluginState.shouldSetClozeTestStyle,
        ),
    };
};

const ensureBoolean = (value: unknown, defaultValue: boolean): boolean => {
    return isBoolean(value) ? value : defaultValue;
};

const ensureHint = (value: unknown, defaultValue: Hint): Hint => {
    return isHint(value) ? value : defaultValue;
};
