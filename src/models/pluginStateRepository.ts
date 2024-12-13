import { Plugin } from "obsidian";
import { PluginState, PluginStateKey } from "./types";
import DefaultPluginState from "./defaultPluginState";

export default class PluginStateRepository {
    private readonly plugin: Plugin;

    constructor(plugin: Plugin) {
        this.plugin = plugin;
    }

    /**
     * ローカルストレージからプラグインの設定を取得
     */
    load = async (): Promise<PluginState> => {
        const data = await this.plugin.loadData();

        if (data == null) {
            return DefaultPluginState.value;
        }

        const state = DefaultPluginState.copyWith({
            shouldMaskBold: data[PluginStateKey.shouldMaskBold],
            shouldMaskItalic: data[PluginStateKey.shouldMaskItalic],
            shouldMaskHighlight: data[PluginStateKey.shouldMaskHighlight],
            selectedHint: data[PluginStateKey.selectedHint],
            blurStrength: data[PluginStateKey.blurStrength],
            peekingPercentage: data[PluginStateKey.peekingPercentage],
            shouldDisplayOnMouseOver:
                data[PluginStateKey.shouldDisplayOnMouseOver],
        });
        return state;
    };

    /**
     * ローカルストレージからプラグインの設定を書き込む
     */
    save = async (state: PluginState): Promise<void> => {
        this.plugin.saveData(state);
    };
}
