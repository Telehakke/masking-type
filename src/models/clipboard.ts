/** クリップボードにテキストの内容をコピーする */
export const writeTextToClipboard = (
    text: string,
    success: () => void,
    failure: () => void,
): void => {
    navigator.clipboard.writeText(text).then(
        () => success(),
        () => failure(),
    );
};
