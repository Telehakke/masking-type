const template = (bold: boolean, italic: boolean, highlight: boolean) => {
    return `%% {"bold": ${bold}, "italic": ${italic}, "highlight": ${highlight}} %%`;
};

const Comment = {
    maskAll: template(true, true, true),
    maskOnlyBold: template(true, false, false),
    maskOnlyItalic: template(false, true, false),
    maskOnlyHighlight: template(false, false, true),
    allNotMasked: template(false, false, false),
} as const;

export default Comment;
