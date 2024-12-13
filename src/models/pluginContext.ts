import DefaultPluginState from "./defaultPluginState";
import { Hint, PluginState } from "./types";

export default class PluginContext {
    static state: PluginState = {
        shouldMaskBold: DefaultPluginState.value.shouldMaskBold,
        shouldMaskItalic: DefaultPluginState.value.shouldMaskItalic,
        shouldMaskHighlight: DefaultPluginState.value.shouldMaskHighlight,
        selectedHint: { ...DefaultPluginState.value.selectedHint },
        blurStrength: DefaultPluginState.value.blurStrength,
        peekingPercentage: DefaultPluginState.value.peekingPercentage,
        shouldDisplayOnMouseOver:
            DefaultPluginState.value.shouldDisplayOnMouseOver,
        shouldSetClozeTestStyle:
            DefaultPluginState.value.shouldSetClozeTestStyle,
    };

    /**
     * 一部の値を上書きした、新しい状態を返す
     */
    // prettier-ignore
    static copyWith = ({
        shouldMaskBold,
        shouldMaskItalic,
        shouldMaskHighlight,
        selectedHint,
        blurStrength,
        peekingPercentage,
        shouldDisplayOnMouseOver,
        shouldSetClozeTestStyle
    }: {
        shouldMaskBold?: boolean;
        shouldMaskItalic?: boolean;
        shouldMaskHighlight?: boolean;
        selectedHint?: Hint;
        blurStrength?: number;
        peekingPercentage?: number;
        shouldDisplayOnMouseOver?: boolean
        shouldSetClozeTestStyle?: boolean
    }): PluginState => {
        const copied: PluginState = {
            shouldMaskBold:
                shouldMaskBold ?? PluginContext.state.shouldMaskBold,
            shouldMaskItalic:
                shouldMaskItalic ?? PluginContext.state.shouldMaskItalic,
            shouldMaskHighlight:
                shouldMaskHighlight ?? PluginContext.state.shouldMaskHighlight,
            selectedHint:
                selectedHint ?? {...PluginContext.state.selectedHint},
            blurStrength:
                blurStrength ?? PluginContext.state.blurStrength,
            peekingPercentage:
                peekingPercentage ?? PluginContext.state.peekingPercentage,
            shouldDisplayOnMouseOver:
                shouldDisplayOnMouseOver ?? PluginContext.state.shouldDisplayOnMouseOver,
            shouldSetClozeTestStyle:
                shouldSetClozeTestStyle ?? PluginContext.state.shouldSetClozeTestStyle
        };
        return copied;
    };
}
