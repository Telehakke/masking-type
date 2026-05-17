import { isNumber } from "./typeGuard";

type Validator = Readonly<{
    MIN: number;
    MAX: number;
    ensure: (value: unknown, defaultValue: number) => number;
}>;

/* -------------------------------------------------------------------------- */

export const PeekingPercentage: Validator = {
    MIN: 10,
    MAX: 50,
    ensure(value, defaultValue) {
        const valid = isNumber(value) ? value : defaultValue;
        return Math.max(Math.min(valid, this.MAX), this.MIN);
    },
};

/* -------------------------------------------------------------------------- */

export const BlurStrength: Validator = {
    MIN: 1,
    MAX: 4,
    ensure(value, defaultValue) {
        const valid = isNumber(value) ? value : defaultValue;
        return Math.max(Math.min(valid, this.MAX), this.MIN);
    },
};
