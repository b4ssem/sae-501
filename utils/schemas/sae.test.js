import { describe, expect, it } from "vitest";
import { SaeZodSchema } from "./sae.js";

describe("SaeZodSchema", () => {
    it("should accept a valid payload", () => {
        const result = SaeZodSchema.safeParse({ title: "Ma SAE", content: "Un contenu valide" });

        expect(result.success).toBe(true);
    });

    it("should reject an empty title", () => {
        const result = SaeZodSchema.safeParse({ title: "", content: "ok" });

        expect(result.success).toBe(false);
    });

    it("should reject content longer than 200 characters", () => {
        const result = SaeZodSchema.safeParse({ title: "ok", content: "a".repeat(201) });

        expect(result.success).toBe(false);
    });

    describe("picking only title/content (client-side usage)", () => {
        const ClientSchema = SaeZodSchema.pick({ title: true, content: true });

        it("should accept a valid payload without the image field", () => {
            const result = ClientSchema.safeParse({ title: "ok", content: "ok" });

            expect(result.success).toBe(true);
        });
    });
});
