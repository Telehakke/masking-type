import DefaultPluginState from "./defaultPluginState";
import { PluginState } from "./types";

export default class PluginContext {
    static state: PluginState = {
        shouldMaskBold: DefaultPluginState.value.shouldMaskBold,
        shouldMaskItalic: DefaultPluginState.value.shouldMaskItalic,
        shouldMaskHighlights: DefaultPluginState.value.shouldMaskHighlights,
        selectedHint: { ...DefaultPluginState.value.selectedHint },
        blurStrength: DefaultPluginState.value.blurStrength,
        peekingPercentage: DefaultPluginState.value.peekingPercentage,
    };
}
