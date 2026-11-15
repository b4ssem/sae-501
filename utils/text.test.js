import { describe, expect, it } from "vitest";
import { getRemainingChars } from "./text.js";

describe("getRemainingChars", () => {
    it("should return the limit when text is empty", () => {
        expect(getRemainingChars("", 200)).toBe(200);
    });

    it("should subtract the text length from the limit", () => {
        expect(getRemainingChars("hello", 200)).toBe(195);
    });

    it("should never return a negative number", () => {
        expect(getRemainingChars("a".repeat(250), 200)).toBe(0);
    });

    it("should treat undefined/null text as empty", () => {
        expect(getRemainingChars(undefined, 10)).toBe(10);
        expect(getRemainingChars(null, 10)).toBe(10);
    });
});
