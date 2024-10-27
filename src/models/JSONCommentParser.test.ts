import {
    Editor,
    EditorChange,
    EditorCommandName,
    EditorPosition,
    EditorRange,
    EditorSelection,
    EditorSelectionOrCaret,
    EditorTransaction,
} from "obsidian";
import { expect, test } from "vitest";
import JSONCommentParser from "./JSONCommentParser";
import Comment from "./comment";

class MockEditor implements Editor {
    private lines: string[];

    constructor(lines: string[]) {
        this.lines = lines;
    }

    getLine(line: number): string {
        return this.lines[line];
    }

    getDoc(): this {
        throw new Error("Method not implemented.");
    }
    refresh(): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string {
        throw new Error("Method not implemented.");
    }
    setValue(_content: string): void {
        throw new Error("Method not implemented.");
    }
    setLine(_n: number, _text: string): void {
        throw new Error("Method not implemented.");
    }
    lineCount(): number {
        throw new Error("Method not implemented.");
    }
    lastLine(): number {
        throw new Error("Method not implemented.");
    }
    getSelection(): string {
        throw new Error("Method not implemented.");
    }
    somethingSelected(): boolean {
        throw new Error("Method not implemented.");
    }
    getRange(_from: EditorPosition, _to: EditorPosition): string {
        throw new Error("Method not implemented.");
    }
    replaceSelection(_replacement: string, _origin?: string): void {
        throw new Error("Method not implemented.");
    }
    replaceRange(
        _replacement: string,
        _from: EditorPosition,
        _to?: EditorPosition,
        _origin?: string
    ): void {
        throw new Error("Method not implemented.");
    }
    getCursor(_string?: "from" | "to" | "head" | "anchor"): EditorPosition {
        throw new Error("Method not implemented.");
    }
    listSelections(): EditorSelection[] {
        throw new Error("Method not implemented.");
    }
    setCursor(_pos: EditorPosition | number, _ch?: number): void {
        throw new Error("Method not implemented.");
    }
    setSelection(_anchor: EditorPosition, _head?: EditorPosition): void {
        throw new Error("Method not implemented.");
    }
    setSelections(_ranges: EditorSelectionOrCaret[], _main?: number): void {
        throw new Error("Method not implemented.");
    }
    focus(): void {
        throw new Error("Method not implemented.");
    }
    blur(): void {
        throw new Error("Method not implemented.");
    }
    hasFocus(): boolean {
        throw new Error("Method not implemented.");
    }
    getScrollInfo(): { top: number; left: number } {
        throw new Error("Method not implemented.");
    }
    scrollTo(_x?: number | null, _y?: number | null): void {
        throw new Error("Method not implemented.");
    }
    scrollIntoView(_range: EditorRange, _center?: boolean): void {
        throw new Error("Method not implemented.");
    }
    undo(): void {
        throw new Error("Method not implemented.");
    }
    redo(): void {
        throw new Error("Method not implemented.");
    }
    exec(_command: EditorCommandName): void {
        throw new Error("Method not implemented.");
    }
    transaction(_tx: EditorTransaction, _origin?: string): void {
        throw new Error("Method not implemented.");
    }
    wordAt(_pos: EditorPosition): EditorRange | null {
        throw new Error("Method not implemented.");
    }
    posToOffset(_pos: EditorPosition): number {
        throw new Error("Method not implemented.");
    }
    offsetToPos(_offset: number): EditorPosition {
        throw new Error("Method not implemented.");
    }
    processLines<T>(
        _read: (line: number, lineText: string) => T | null,
        _write: (
            line: number,
            lineText: string,
            value: T | null
        ) => EditorChange | void,
        _ignoreEmpty?: boolean
    ): void {
        throw new Error("Method not implemented.");
    }
}

/* -------------------------------------------------------------------------- */

test("JSONを含むコメントからオブジェクトを生成できるかどうか1", () => {
    const lines = [Comment.maskAll];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    const expected = { bold: true, italic: true, highlight: true };
    expect(result).toEqual(expected);
});

test("JSONを含むコメントからオブジェクトを生成できるかどうか2", () => {
    const lines = [Comment.maskOnlyBold];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    const expected = { bold: true, italic: false, highlight: false };
    expect(result).toEqual(expected);
});

test("JSONを含むコメントからオブジェクトを生成できるかどうか3", () => {
    const lines = [Comment.maskOnlyItalic];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    const expected = { bold: false, italic: true, highlight: false };
    expect(result).toEqual(expected);
});

test("JSONを含むコメントからオブジェクトを生成できるかどうか4", () => {
    const lines = [Comment.maskOnlyHighlight];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    const expected = { bold: false, italic: false, highlight: true };
    expect(result).toEqual(expected);
});

test("JSONを含むコメントからオブジェクトを生成できるかどうか5", () => {
    const lines = [Comment.allNotMasked];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    const expected = { bold: false, italic: false, highlight: false };
    expect(result).toEqual(expected);
});

test("JSONを含まないコメントを渡された場合に、nullを返すかどうか", () => {
    const lines = ["%% not JSON %%"];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    expect(result).toBeNull();
});

test("SyntaxErrorとなるコメントを渡された場合に、nullを返すかどうか", () => {
    const lines = ["%% {not JSON} %%"];
    const editor = new MockEditor(lines);
    const jsonCommentParser = new JSONCommentParser(editor);

    const result = jsonCommentParser.parse(0, lines.length - 1);

    expect(result).toBeNull();
});
