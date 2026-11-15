import { describe, expect, it } from "vitest";
import { ArticleZodSchema } from "./article.js";

describe("ArticleZodSchema", () => {
    it("should accept a valid payload", () => {
        const result = ArticleZodSchema.safeParse({
            title: "Mon article",
            content: "Un contenu valide",
            image: "photo.png",
        });

        expect(result.success).toBe(true);
    });

    it("should reject an empty title", () => {
        const result = ArticleZodSchema.safeParse({ title: "", content: "ok", image: "photo.png" });

        expect(result.success).toBe(false);
    });

    it("should reject a missing content", () => {
        const result = ArticleZodSchema.safeParse({ title: "ok", image: "photo.png" });

        expect(result.success).toBe(false);
    });

    describe("picking only title/content (client-side usage)", () => {
        const ClientSchema = ArticleZodSchema.pick({ title: true, content: true });

        it("should accept title+content without requiring image", () => {
            const result = ClientSchema.safeParse({ title: "ok", content: "ok" });

            expect(result.success).toBe(true);
        });

        it("should still reject an empty title", () => {
            const result = ClientSchema.safeParse({ title: "", content: "ok" });

            expect(result.success).toBe(false);
        });
    });
});
