import { Hint, HintEnum, Language, PluginState } from "./types";

export default class DefaultPluginState {
    static readonly value: PluginState = {
        language: "en",
        shouldMaskBold: true,
        shouldMaskItalic: true,
        shouldMaskHighlights: true,
        selectedHint: { type: HintEnum.none, value: 0 },
        blurStrength: 2,
        peekingPercentage: 30,
    };

    /**
     * デファクト値を返す。一部の値を上書き可能
     */
    // prettier-ignore
    static copyWith = ({
        language,
        shouldMaskBold,
        shouldMaskItalic,
        shouldMaskHighlights,
        selectedHint,
        blurStrength,
        peekingPercentage,
    }: {
        language?: Language;
        shouldMaskBold?: boolean;
        shouldMaskItalic?: boolean;
        shouldMaskHighlights?: boolean;
        selectedHint?: Hint;
        blurStrength?: number
        peekingPercentage?: number;
    }): PluginState => {
        const copied: PluginState = {
            language:
                language ?? this.value.language,
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
