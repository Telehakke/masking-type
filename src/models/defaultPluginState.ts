import { Hint, HintEnum, PluginState } from "./types";

export default class DefaultPluginState {
    static readonly value: PluginState = {
        shouldMaskBold: true,
        shouldMaskItalic: true,
        shouldMaskHighlights: true,
        selectedHint: { type: HintEnum.none, value: 0 },
        blurStrength: 2,
        peekingPercentage: 30,
    };

    /**
     * デフォルト値を返す。一部の値を上書き可能
     */
    // prettier-ignore
    static copyWith = ({
        shouldMaskBold,
        shouldMaskItalic,
        shouldMaskHighlights,
        selectedHint,
        blurStrength,
        peekingPercentage,
    }: {
        shouldMaskBold?: boolean;
        shouldMaskItalic?: boolean;
        shouldMaskHighlights?: boolean;
        selectedHint?: Hint;
        blurStrength?: number
        peekingPercentage?: number;
    }): PluginState => {
        const copied: PluginState = {
            shouldMaskBold:
                shouldMaskBold ?? this.value.shouldMaskBold,
            shouldMaskItalic:
                shouldMaskItalic ?? this.value.shouldMaskItalic,
            shouldMaskHighlights:
                shouldMaskHighlights ?? this.value.shouldMaskHighlights,
            selectedHint:
                selectedHint ?? {...this.value.selectedHint},
            blurStrength:
                blurStrength ?? this.value.blurStrength,
            peekingPercentage:
                peekingPercentage ?? this.value.peekingPercentage,
        };
        return copied;
    };
}
