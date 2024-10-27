export default class Clipboard {
    /**
     * クリップボードにテキストの内容をコピーする
     */
    static write = (
        text: string,
        success: () => void,
        failure: () => void
    ): void => {
        navigator.clipboard //
            .writeText(text)
            .then(
                (_) => success(),
                (_) => failure()
            );
    };
}
