import { Plugin } from "obsidian";
import { LocalStorage } from "./localStorage";
import { PluginStore, pluginStore } from "./pluginStore";
import { NoteState } from "./types";

export class Config {
    /** プラグインの状態 */
    static store = pluginStore;

    /** ノート個別のマスク設定 */
    static noteState: NoteState = {
        bold: false,
        italic: false,
        highlight: false,
    };

    /** プラグインの状態の更新と保存 */
    static syncStore = (plugin: Plugin, store: PluginStore): void => {
        this.store = store;
        LocalStorage.save(plugin, store);
    };
}
