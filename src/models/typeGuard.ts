export const isNotNull = (value: unknown): value is Record<string, unknown> => {
    return value != null;
};

export const isNumber = (value: unknown): value is number => {
    return typeof value === "number";
};

export const isBoolean = (value: unknown): value is boolean => {
    return typeof value === "boolean";
};
