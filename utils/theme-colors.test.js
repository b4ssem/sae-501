import { describe, expect, it } from "vitest";
import { DEFAULT_THEME_COLOR, THEME_COLORS } from "./theme-colors.js";

describe("THEME_COLORS", () => {
    it("should include the default theme color", () => {
        expect(THEME_COLORS).toHaveProperty(DEFAULT_THEME_COLOR);
    });

    it("should define the same set of shades for every color", () => {
        const referenceShades = Object.keys(THEME_COLORS[DEFAULT_THEME_COLOR]).sort();

        Object.entries(THEME_COLORS).forEach(([colorName, palette]) => {
            expect(Object.keys(palette).sort(), colorName).toEqual(referenceShades);
        });
    });

    it("should only contain valid oklch() values", () => {
        Object.values(THEME_COLORS).forEach((palette) => {
            Object.values(palette).forEach((value) => {
                expect(value).toMatch(/^oklch\(.+\)$/);
            });
        });
    });
});
