import { describe, expect, it } from "vitest";
import { AuthorZodSchema } from "./author.js";

describe("AuthorZodSchema", () => {
    it("should accept a valid payload", () => {
        const result = AuthorZodSchema.safeParse({
            firstname: "Ada",
            lastname: "Lovelace",
            email: "ada@example.com",
            image: "photo.png",
            bio: "",
        });

        expect(result.success).toBe(true);
    });

    it("should reject an empty firstname", () => {
        const result = AuthorZodSchema.safeParse({
            firstname: "",
            lastname: "Lovelace",
            email: "ada@example.com",
            image: "photo.png",
            bio: "",
        });

        expect(result.success).toBe(false);
    });

    it("should reject an invalid email", () => {
        const result = AuthorZodSchema.safeParse({
            firstname: "Ada",
            lastname: "Lovelace",
            email: "pas-un-email",
            image: "photo.png",
            bio: "",
        });

        expect(result.success).toBe(false);
    });

    it("should reject a typo'd provider domain (gmail.co instead of gmail.com)", () => {
        const result = AuthorZodSchema.safeParse({
            firstname: "Ada",
            lastname: "Lovelace",
            email: "ada@gmail.co",
            image: "photo.png",
            bio: "",
        });

        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toContain("gmail.com");
    });

    it("should accept a legitimate short-TLD domain unrelated to any known provider", () => {
        const result = AuthorZodSchema.safeParse({
            firstname: "Ada",
            lastname: "Lovelace",
            email: "ada@my-startup.co",
            image: "photo.png",
            bio: "",
        });

        expect(result.success).toBe(true);
    });

    describe("picking only firstname/lastname/email (client-side usage)", () => {
        const ClientSchema = AuthorZodSchema.pick({ firstname: true, lastname: true, email: true });

        it("should accept a valid payload without image/bio", () => {
            const result = ClientSchema.safeParse({
                firstname: "Ada",
                lastname: "Lovelace",
                email: "ada@example.com",
            });

            expect(result.success).toBe(true);
        });

        it("should still reject a typo'd provider domain", () => {
            const result = ClientSchema.safeParse({
                firstname: "Ada",
                lastname: "Lovelace",
                email: "ada@gmail.co",
            });

            expect(result.success).toBe(false);
        });

        it("should still reject an invalid email", () => {
            const result = ClientSchema.safeParse({
                firstname: "Ada",
                lastname: "Lovelace",
                email: "pas-un-email",
            });

            expect(result.success).toBe(false);
        });
    });
});
