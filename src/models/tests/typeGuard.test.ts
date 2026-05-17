import { describe, expect, it } from "vitest";
import { isBoolean, isNotNull, isNumber } from "../typeGuard";

describe("isNotNull", () => {
    it("null以外の値に対してtrueを返す", () => {
        const result = isNotNull({});
        expect(result).toBeTruthy();
    });

    it("nullに対してfalseを返す", () => {
        const result = isNotNull(null);
        expect(result).toBeFalsy();
    });
});

describe("isNumber", () => {
    it("数値に対してtrueを返す", () => {
        const result = isNumber(0);
        expect(result).toBeTruthy();
    });

    it("数値以外の値に対してfalseを返す", () => {
        const result = isNumber(null);
        expect(result).toBeFalsy();
    });
});

describe("isBoolean", () => {
    it("bool値に対してtrueを返す", () => {
        const result = isBoolean(true);
        expect(result).toBeTruthy();
    });

    it("bool値以外の値に対してtrueを返す", () => {
        const result = isBoolean(null);
        expect(result).toBeFalsy();
    });
});
