import { App, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import PluginStateRepository from "../models/pluginStateRepository";
import { HintEnum, HintType, Language, LanguageEnum } from "../models/types";
import Translator from "../models/translator";
import PluginContext from "../models/pluginContext";
import Clipboard from "../models/clipboard";
import Comment from "../models/comment";

export default class MaskingTypeSettingTab extends PluginSettingTab {
    private readonly iconNameOfCopy = "clipboard-copy";
    private readonly pluginStateRepository: PluginStateRepository;

    constructor(
        app: App,
        plugin: Plugin,
        pluginStateRepository: PluginStateRepository
    ) {
        super(app, plugin);
        this.pluginStateRepository = pluginStateRepository;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        const translation = Translator.getTranslation(
            PluginContext.state.language
        );

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName("Language") //
            .addDropdown((c) => {
                c.addOption(LanguageEnum.en, "English");
                c.addOption(LanguageEnum.ja, "日本語");
                c.setValue(PluginContext.state.language);
                c.onChange((v) => {
                    PluginContext.state = {
                        ...PluginContext.state,
                        language: v as Language,
                    };
                    this.pluginStateRepository.save(PluginContext.state);
                    this.display();
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(translation.maskBold)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskBold);
                c.onChange((v) => {
                    PluginContext.state = {
                        ...PluginContext.state,
                        shouldMaskBold: v,
                    };
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        new Setting(containerEl)
            .setName(translation.maskItalic)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskItalic);
                c.onChange((v) => {
                    PluginContext.state = {
                        ...PluginContext.state,
                        shouldMaskItalic: v,
                    };
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        new Setting(containerEl)
            .setName(translation.maskHighlight)
            .addToggle((c) => {
                c.setValue(PluginContext.state.shouldMaskHighlights);
                c.onChange((v) => {
                    PluginContext.state = {
                        ...PluginContext.state,
                        shouldMaskHighlights: v,
                    };
                    this.pluginStateRepository.save(PluginContext.state);
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(translation.setForEachNote)
            .setDesc(translation.descriptionOfSetForEachNote)
            .setHeading();

        new Setting(containerEl)
            .setName(translation.maskAll)
            .setDesc(Comment.maskAll)
            .addButton((c) => {
                c.setIcon(this.iconNameOfCopy);
                c.onClick((_) => {
                    Clipboard.write(
                        Comment.maskAll,
                        () => new Notice(translation.copySucceeded),
                        () => new Notice(translation.copyFailed)
                    );
                });
            });

        new Setting(containerEl)
            .setName(translation.maskOnlyBold)
            .setDesc(Comment.maskOnlyBold)
            .addButton((c) => {
                c.setIcon(this.iconNameOfCopy);
                c.onClick((_) => {
                    Clipboard.write(
                        Comment.maskOnlyBold,
                        () => new Notice(translation.copySucceeded),
                        () => new Notice(translation.copyFailed)
                    );
                });
            });

        new Setting(containerEl)
            .setName(translation.maskOnlyItalic)
            .setDesc(Comment.maskOnlyItalic)
            .addButton((c) => {
                c.setIcon(this.iconNameOfCopy);
                c.onClick((_) => {
                    Clipboard.write(
                        Comment.maskOnlyItalic,
                        () => new Notice(translation.copySucceeded),
                        () => new Notice(translation.copyFailed)
                    );
                });
            });

        new Setting(containerEl)
            .setName(translation.maskOnlyHighlight)
            .setDesc(Comment.maskOnlyHighlight)
            .addButton((c) => {
                c.setIcon(this.iconNameOfCopy);
                c.onClick((_) => {
                    Clipboard.write(
                        Comment.maskOnlyHighlight,
                        () => new Notice(translation.copySucceeded),
                        () => new Notice(translation.copyFailed)
                    );
                });
            });

        new Setting(containerEl)
            .setName(translation.allNotMasked)
            .setDesc(Comment.allNotMasked)
            .addButton((c) => {
                c.setIcon(this.iconNameOfCopy);
                c.onClick((_) => {
                    Clipboard.write(
                        Comment.allNotMasked,
                        () => new Notice(translation.copySucceeded),
                        () => new Notice(translation.copyFailed)
                    );
                });
            });

        /* -------------------------------------------------------------------------- */

        new Setting(containerEl)
            .setName(translation.hint)
            .setDesc(translation.descriptionOfHint)
            .setHeading()
            .addDropdown((c) => {
                c.addOption(HintEnum.none, translation.none);
                c.addOption(HintEnum.blur, translation.blur);
                c.addOption(HintEnum.peek, translation.peek);
                c.setValue(PluginContext.state.selectedHint.type);
                c.onChange((v) => {
                    let value = PluginContext.state.selectedHint.value;
                    if (v === HintEnum.blur) {
                        value = PluginContext.state.blurStrength;
                    }
                    if (v === HintEnum.peek) {
                        value = PluginContext.state.peekingPercentage;
                    }

                    PluginContext.state = {
                        ...PluginContext.state,
                        selectedHint: {
                            type: v as HintType,
                            value: value,
                        },
                    };
                    this.pluginStateRepository.save(PluginContext.state);
                    this.display();
                });
            });

        if (PluginContext.state.selectedHint.type === HintEnum.peek) {
            new Setting(containerEl)
                .setName(translation.peekPercentage)
                .addSlider((c) => {
                    c.setLimits(10, 50, 10);
                    c.setValue(PluginContext.state.peekingPercentage);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        PluginContext.state = {
                            ...PluginContext.state,
                            selectedHint: {
                                type: PluginContext.state.selectedHint.type,
                                value: v,
                            },
                            peekingPercentage: v,
                        };
                        this.pluginStateRepository.save(PluginContext.state);
                    });
                });
        }

        if (PluginContext.state.selectedHint.type === HintEnum.blur) {
            new Setting(containerEl)
                .setName(translation.blurStrength)
                .addSlider((c) => {
                    c.setLimits(1, 4, 1);
                    c.setValue(PluginContext.state.blurStrength);
                    c.setDynamicTooltip();
                    c.onChange((v) => {
                        PluginContext.state = {
                            ...PluginContext.state,
                            selectedHint: {
                                type: PluginContext.state.selectedHint.type,
                                value: v,
                            },
                            blurStrength: v,
                        };
                        this.pluginStateRepository.save(PluginContext.state);
                    });
                });
        }

        const footer = createEl("p", "mt-note");
        footer.textContent = translation.footer;
        containerEl.appendChild(footer);
    }
}
