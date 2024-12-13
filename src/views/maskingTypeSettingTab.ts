import { App, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import PluginStateRepository from "../models/pluginStateRepository";
import { HintEnum, HintType } from "../models/types";
import { Translation } from "../models/translator";
import PluginContext from "../models/pluginContext";
import Clipboard from "../models/clipboard";

export default class MaskingTypeSettingTab extends PluginSettingTab {
    private readonly pluginStateRepository: PluginStateRepository;
    private readonly translation: Translation;

    constructor(
        app: App,
        plugin: Plugin,
        pluginStateRepository: PluginStateRepository,
        translation: Translation
    ) {
        super(app, plugin);
        this.pluginStateRepository = pluginStateRepository;
        this.translation = translation;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.maskBold)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskBold);
                c.onChange((v) => {
                    PluginContext.state = PluginContext.copyWith({
                        shouldMaskBold: v,
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        new Setting(containerEl)
            .setName(this.translation.maskItalic)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskItalic);
                c.onChange((v) => {
                    PluginContext.state = PluginContext.copyWith({
                        shouldMaskItalic: v,
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        new Setting(containerEl)
            .setName(this.translation.maskHighlight)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskHighlight);
                c.onChange((v) => {
                    PluginContext.state = PluginContext.copyWith({
                        shouldMaskHighlight: v,
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        /* -------------------------------------------------------------------------- */

        // prettier-ignore
        new Setting(containerEl)
            .setName(this.translation.setForEachNote)
            .setDesc(this.translation.descriptionOfSetForEachNote)
            .setHeading()
            .addButton((c) => {
                c.setIcon("clipboard-copy");
                c.onClick((_) => {
                    Clipboard.write(
`---
bold: false
italic: false
highlight: false
---`,
                        () => new Notice(this.translation.copySucceeded),
                        () => new Notice(this.translation.copyFailed)
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
                c.setValue(PluginContext.state.selectedHint.type);
                c.onChange((v) => {
                    let value = PluginContext.state.selectedHint.value;
                    if (v === HintEnum.blur) {
                        value = PluginContext.state.blurStrength;
                    }
                    if (v === HintEnum.peek) {
                        value = PluginContext.state.peekingPercentage;
                    }

                    PluginContext.state = PluginContext.copyWith({
                        selectedHint: {
                            type: v as HintType,
                            value: value,
                        },
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                    this.display();
                });
            });

        if (PluginContext.state.selectedHint.type === HintEnum.peek) {
            new Setting(containerEl)
                .setName(this.translation.peekPercentage)
                .addSlider((c) => {
                    c.setLimits(10, 50, 10);
                    c.setValue(PluginContext.state.peekingPercentage);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        PluginContext.state = PluginContext.copyWith({
                            selectedHint: {
                                type: PluginContext.state.selectedHint.type,
                                value: v,
                            },
                            peekingPercentage: v,
                        });
                        this.pluginStateRepository.save(PluginContext.state);
                    });
                });
        }

        if (PluginContext.state.selectedHint.type === HintEnum.blur) {
            new Setting(containerEl)
                .setName(this.translation.blurStrength)
                .addSlider((c) => {
                    c.setLimits(1, 4, 1);
                    c.setValue(PluginContext.state.blurStrength);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        PluginContext.state = PluginContext.copyWith({
                            selectedHint: {
                                type: PluginContext.state.selectedHint.type,
                                value: v,
                            },
                            blurStrength: v,
                        });
                        this.pluginStateRepository.save(PluginContext.state);
                    });
                });
        }

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.displayOnMouseOver)
            .setDesc(this.translation.descriptionOfDisplayOnMouseOver)
            .setHeading()
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldDisplayOnMouseOver);
                c.onChange((v) => {
                    PluginContext.state = PluginContext.copyWith({
                        shouldDisplayOnMouseOver: v,
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(this.translation.pdfClozeTest)
            .setDesc(this.translation.descriptionPdfClozeTest)
            .setHeading()
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldSetClozeTestStyle);
                c.onChange((v) => {
                    PluginContext.state = PluginContext.copyWith({
                        shouldSetClozeTestStyle: v,
                    });
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        const footer = createEl("p", "mt-note");
        footer.textContent = this.translation.footer;
        containerEl.appendChild(footer);
    }
}
