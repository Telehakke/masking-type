import { Hint, HintEnum, PluginState } from "./types";

export default class DefaultPluginState {
    static readonly value: PluginState = {
        shouldMaskBold: true,
        shouldMaskItalic: true,
        shouldMaskHighlight: true,
        selectedHint: { type: HintEnum.none, value: 0 },
        blurStrength: 2,
        peekingPercentage: 30,
        shouldDisplayOnMouseOver: false,
        shouldSetClozeTestStyle: false,
    };

    /**
     * デフォルト値を返す。一部の値を上書き可能
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
        blurStrength?: number
        peekingPercentage?: number;
        shouldDisplayOnMouseOver?: boolean
        shouldSetClozeTestStyle?: boolean
    }): PluginState => {
        const copied: PluginState = {
            shouldMaskBold:
                shouldMaskBold ?? this.value.shouldMaskBold,
            shouldMaskItalic:
                shouldMaskItalic ?? this.value.shouldMaskItalic,
            shouldMaskHighlight:
                shouldMaskHighlight ?? this.value.shouldMaskHighlight,
            selectedHint:
                selectedHint ?? {...this.value.selectedHint},
            blurStrength:
                blurStrength ?? this.value.blurStrength,
            peekingPercentage:
                peekingPercentage ?? this.value.peekingPercentage,
            shouldDisplayOnMouseOver:
                shouldDisplayOnMouseOver ?? this.value.shouldDisplayOnMouseOver,
            shouldSetClozeTestStyle:
                shouldSetClozeTestStyle ?? this.value.shouldSetClozeTestStyle
        };
        return copied;
    };
}
