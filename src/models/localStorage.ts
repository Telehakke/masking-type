import { Plugin } from "obsidian";
import { createPluginState, PluginState } from "./pluginState";

export class LocalStorage {
    /** プラグインの設定を取得 */
    static readonly load = async (plugin: Plugin): Promise<PluginState> => {
        return createPluginState(await plugin.loadData());
    };

    /** プラグインの設定を保存 */
    static readonly save = (plugin: Plugin, state: PluginState): void => {
        plugin.saveData(state).catch(() => {});
    };
}
