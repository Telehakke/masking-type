import { expect, test } from "vitest";
import { defaultPluginState, PluginState } from "../pluginState";
import { PluginStore, pluginStore } from "../pluginStore";
import { BlurStrength, PeekingPercentage } from "../validator";

const extractPluginState = (store: PluginStore): PluginState => {
    return {
        shouldMaskBold: store.shouldMaskBold,
        shouldMaskItalic: store.shouldMaskItalic,
        shouldMaskHighlight: store.shouldMaskHighlight,
        selectedHint: store.selectedHint,
        blurStrength: store.blurStrength,
        peekingPercentage: store.peekingPercentage,
        shouldDisplayOnMouseOver: store.shouldDisplayOnMouseOver,
        shouldMaskOnMouseLeave: store.shouldMaskOnMouseLeave,
        shouldSetClozeTestStyle: store.shouldSetClozeTestStyle,
    };
};

test("setPluginState", () => {
    const obj: PluginState = {
        shouldMaskBold: false,
        shouldMaskItalic: false,
        shouldMaskHighlight: false,
        selectedHint: { type: "blur", value: 1 },
        blurStrength: BlurStrength.MIN,
        peekingPercentage: PeekingPercentage.MIN,
        shouldDisplayOnMouseOver: true,
        shouldMaskOnMouseLeave: true,
        shouldSetClozeTestStyle: true,
    };
    const result = pluginStore.setPluginState(obj);
    expect(extractPluginState(result)).toEqual(obj);
});

test("setShouldMaskBold", () => {
    const result = pluginStore.setShouldMaskBold(false);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldMaskBold: false,
    });
});

test("setShouldMaskItalic", () => {
    const result = pluginStore.setShouldMaskItalic(false);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldMaskItalic: false,
    });
});

test("setShouldMaskHighlight", () => {
    const result = pluginStore.setShouldMaskHighlight(false);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldMaskHighlight: false,
    });
});

test("setSelectedHint", () => {
    const result = pluginStore.setSelectedHint({ type: "blur", value: 1 });
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        selectedHint: { type: "blur", value: 1 },
    });
});

test("setBlurStrength", () => {
    const result = pluginStore.setBlurStrength(BlurStrength.MIN);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        blurStrength: BlurStrength.MIN,
    });
});

test("setPeekingPercentage", () => {
    const result = pluginStore.setPeekingPercentage(PeekingPercentage.MIN);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        peekingPercentage: PeekingPercentage.MIN,
    });
});

test("setShouldDisplayOnMouseOver", () => {
    const result = pluginStore.setShouldDisplayOnMouseOver(true);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldDisplayOnMouseOver: true,
    });
});

test("setShouldMaskOnMouseLeave", () => {
    const result = pluginStore.setShouldMaskOnMouseLeave(true);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldMaskOnMouseLeave: true,
    });
});

test("setShouldSetClozeTestStyle", () => {
    const result = pluginStore.setShouldSetClozeTestStyle(true);
    expect(extractPluginState(result)).toEqual({
        ...defaultPluginState,
        shouldSetClozeTestStyle: true,
    });
});
