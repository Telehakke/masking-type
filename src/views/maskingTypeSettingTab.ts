import { Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import { writeTextToClipboard } from "../models/clipboard";
import { Config } from "../models/config";
import { Translation } from "../models/translator";
import { DecorationEnum, HintEnum, HintType } from "../models/types";
import { BlurStrength, PeekingPercentage } from "../models/validator";

export default class MaskingTypeSettingTab extends PluginSettingTab {
    private readonly plugin: Plugin;
    private readonly translation: Translation;

    constructor(plugin: Plugin, translation: Translation) {
        super(plugin.app, plugin);
        this.plugin = plugin;
        this.translation = translation;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.maskBold)
            .addToggle((c) => {
                c.setValue(Config.store.shouldMaskBold);
                c.onChange((v) => {
                    const newStore = Config.store.setShouldMaskBold(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        new Setting(containerEl)
            .setName(this.translation.maskItalic)
            .addToggle((c) => {
                c.setValue(Config.store.shouldMaskItalic);
                c.onChange((v) => {
                    const newStore = Config.store.setShouldMaskItalic(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        new Setting(containerEl)
            .setName(this.translation.maskHighlight)
            .addToggle((c) => {
                c.setValue(Config.store.shouldMaskHighlight);
                c.onChange((v) => {
                    const newStore = Config.store.setShouldMaskHighlight(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        /* -------------------------------------------------------------------------- */

        const propertyStr = [
            "---",
            `${DecorationEnum.bold}: false`,
            `${DecorationEnum.italic}: false`,
            `${DecorationEnum.highlight}: false`,
            "---",
        ].join("\n");

        new Setting(containerEl)
            .setName(this.translation.setForEachNote)
            .setDesc(this.translation.descriptionOfSetForEachNote)
            .setHeading()
            .addButton((c) => {
                c.setIcon("clipboard-copy");
                c.onClick(() => {
                    writeTextToClipboard(
                        propertyStr,
                        () => new Notice(this.translation.copySucceeded),
                        () => new Notice(this.translation.copyFailed),
                    );
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.hint)
            .setDesc(this.translation.descriptionOfHint)
            .setHeading()
            .addDropdown((c) => {
                c.addOption(HintEnum.none, this.translation.none);
                c.addOption(HintEnum.blur, this.translation.blur);
                c.addOption(HintEnum.peek, this.translation.peek);
                c.setValue(Config.store.selectedHint.type);
                c.onChange((v) => {
                    let value = Config.store.selectedHint.value;
                    if (v === HintEnum.blur) value = Config.store.blurStrength;
                    if (v === HintEnum.peek)
                        value = Config.store.peekingPercentage;

                    const newStore = Config.store.setSelectedHint({
                        type: v as HintType,
                        value,
                    });
                    Config.syncStore(this.plugin, newStore);
                    this.display();
                });
            });

        if (Config.store.selectedHint.type === HintEnum.peek) {
            new Setting(containerEl)
                .setName(this.translation.peekPercentage)
                .addSlider((c) => {
                    const { MIN, MAX } = PeekingPercentage;
                    c.setLimits(MIN, MAX, 10);
                    c.setValue(Config.store.peekingPercentage);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        const newStore = Config.store
                            .setPeekingPercentage(v)
                            .setSelectedHint({
                                type: "peek",
                                value: v,
                            });
                        Config.syncStore(this.plugin, newStore);
                    });
                });
        }

        if (Config.store.selectedHint.type === HintEnum.blur) {
            new Setting(containerEl)
                .setName(this.translation.blurStrength)
                .addSlider((c) => {
                    const { MIN, MAX } = BlurStrength;
                    c.setLimits(MIN, MAX, 1);
                    c.setValue(Config.store.blurStrength);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        const newStore = Config.store
                            .setBlurStrength(v)
                            .setSelectedHint({
                                type: "blur",
                                value: v,
                            });
                        Config.syncStore(this.plugin, newStore);
                    });
                });
        }

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.displayOnMouseOver)
            .setDesc(this.translation.descriptionOfDisplayOnMouseOver)
            .setHeading()
            .addToggle((c) => {
                c.setValue(Config.store.shouldDisplayOnMouseOver);
                c.onChange((v) => {
                    const newStore =
                        Config.store.setShouldDisplayOnMouseOver(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.maskOnMouseLeave)
            .setDesc(this.translation.descriptionOfMaskOnMouseLeave)
            .setHeading()
            .addToggle((c) => {
                c.setValue(Config.store.shouldMaskOnMouseLeave);
                c.onChange((v) => {
                    const newStore = Config.store.setShouldMaskOnMouseLeave(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.pdfClozeTest)
            .setDesc(this.translation.descriptionPdfClozeTest)
            .setHeading()
            .addToggle((c) => {
                c.setValue(Config.store.shouldSetClozeTestStyle);
                c.onChange((v) => {
                    const newStore = Config.store.setShouldSetClozeTestStyle(v);
                    Config.syncStore(this.plugin, newStore);
                });
            });

        const footer = createEl("p", "mt-note");
        footer.textContent = this.translation.footer;
        containerEl.appendChild(footer);
    }
}
