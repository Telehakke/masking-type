import { defaultPluginState, PluginState } from "./pluginState";
import { Hint } from "./types";

export type PluginStore = PluginState &
    Readonly<{
        setPluginState: (value: PluginState) => PluginStore;
        setShouldMaskBold: (value: boolean) => PluginStore;
        setShouldMaskItalic: (value: boolean) => PluginStore;
        setShouldMaskHighlight: (value: boolean) => PluginStore;
        setSelectedHint: (value: Hint) => PluginStore;
        setBlurStrength: (value: number) => PluginStore;
        setPeekingPercentage: (value: number) => PluginStore;
        setShouldDisplayOnMouseOver: (value: boolean) => PluginStore;
        setShouldMaskOnMouseLeave: (value: boolean) => PluginStore;
        setShouldSetClozeTestStyle: (value: boolean) => PluginStore;
    }>;

export const pluginStore: PluginStore = {
    ...defaultPluginState,
    setPluginState(value) {
        return { ...this, ...value };
    },
    setShouldMaskBold(value) {
        return { ...this, shouldMaskBold: value };
    },
    setShouldMaskItalic(value) {
        return { ...this, shouldMaskItalic: value };
    },
    setShouldMaskHighlight(value) {
        return { ...this, shouldMaskHighlight: value };
    },
    setSelectedHint(value) {
        return { ...this, selectedHint: value };
    },
    setBlurStrength(value) {
        return { ...this, blurStrength: value };
    },
    setPeekingPercentage(value) {
        return { ...this, peekingPercentage: value };
    },
    setShouldDisplayOnMouseOver(value) {
        return { ...this, shouldDisplayOnMouseOver: value };
    },
    setShouldMaskOnMouseLeave(value) {
        return { ...this, shouldMaskOnMouseLeave: value };
    },
    setShouldSetClozeTestStyle(value) {
        return { ...this, shouldSetClozeTestStyle: value };
    },
};
