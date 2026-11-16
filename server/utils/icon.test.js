import { describe, expect, it } from "vitest";
import icon from "./icon.js";

describe("icon", () => {
    it("should return svg markup for a valid icon name", () => {
        const markup = icon("pencil");
        expect(markup).toContain("<svg");
        expect(markup).toContain("</svg>");
    });

    it("should inject the given class name on the svg tag", () => {
        const markup = icon("pencil", { className: "w-4 h-4 text-red-500" });
        expect(markup).toContain('class="w-4 h-4 text-red-500"');
    });

    it("should use outline 24px by default", () => {
        const outline = icon("pencil");
        const solid = icon("pencil", { variant: "solid" });
        expect(outline).not.toBe(solid);
    });

    it("should throw a clear error for an unknown icon name", () => {
        expect(() => icon("ceci-nexiste-pas")).toThrow(/introuvable/);
    });
});
