import { describe, expect, it } from "vitest";
import { Hint, isHint } from "../types";

describe("isHint", () => {
    it("正常値に対してtrueを返す1", () => {
        const hint: Hint = { type: "none", value: 0 };
        const result = isHint(hint);
        expect(result).toBeTruthy();
    });

    it("正常値に対してtrueを返す2", () => {
        const hint: Hint = { type: "blur", value: 0 };
        const result = isHint(hint);
        expect(result).toBeTruthy();
    });

    it("正常値に対してtrueを返す3", () => {
        const hint: Hint = { type: "peek", value: 0 };
        const result = isHint(hint);
        expect(result).toBeTruthy();
    });

    it("不正値に対してfalseを返す1", () => {
        const result = isHint(null);
        expect(result).toBeFalsy();
    });

    it("不正値に対してfalseを返す2", () => {
        const result = isHint({ type: "", value: 0 });
        expect(result).toBeFalsy();
    });

    it("不正値に対してfalseを返す3", () => {
        const result = isHint({ type: "none", value: "" });
        expect(result).toBeFalsy();
    });
});
