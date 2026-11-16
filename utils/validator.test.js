import { describe, expect, it } from "vitest";
import { imageValidator } from "./validator.js";

describe("imageValidator", () => {
    it("should return an empty object if image is valid", () => {
        const image = { mimetype: "image/png", size: 1024 };
        expect(imageValidator(image)).toEqual({});
    });

    it("should return incorrect_format error if mimetype is not allowed", () => {
        const image = { mimetype: "application/pdf", size: 1024 };
        expect(imageValidator(image).type).toBe("incorrect_format");
    });

    it("should return upload_size error if image is too heavy", () => {
        const oneMo = 1024 * 1024;
        const image = { mimetype: "image/png", size: oneMo * 2 };
        expect(imageValidator(image).type).toBe("upload_size");
    });

    it("should accept a custom list of allowed mime types", () => {
        const image = { mimetype: "image/webp", size: 1024 };
        expect(imageValidator(image, ["image/webp"]).type).toBeUndefined();
    });
});
