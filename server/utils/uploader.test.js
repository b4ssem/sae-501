import fs from "node:fs";
import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { uploadImage } from "./uploader.js";

describe("uploadImage", () => {
    let tempSourcePath;
    let uploadDir;

    beforeEach(() => {
        tempSourcePath = path.join(os.tmpdir(), `uploader-test-${Date.now()}.png`);
        fs.writeFileSync(tempSourcePath, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
        uploadDir = path.join(os.tmpdir(), `uploader-test-dir-${Date.now()}/`);
    });

    afterEach(async () => {
        fs.rmSync(tempSourcePath, { force: true });
        await fsPromises.rm(uploadDir, { recursive: true, force: true });
    });

    it("should create the upload directory if it does not exist yet", async () => {
        expect(fs.existsSync(uploadDir)).toBe(false);

        await uploadImage(
            { path: tempSourcePath, filename: "photo.png", mimetype: "image/png", size: 4 },
            uploadDir
        );

        expect(fs.existsSync(uploadDir)).toBe(true);
    });

    it("should copy a valid image to the upload directory without errors", async () => {
        const result = await uploadImage(
            { path: tempSourcePath, filename: "photo.png", mimetype: "image/png", size: 4 },
            uploadDir
        );

        expect(result.list_errors).toEqual([]);
        expect(result.image_path).toBe(`${uploadDir}photo.png`);
        expect(fs.existsSync(result.image_path)).toBe(true);
    });

    it("should reject an invalid mime type without writing any file", async () => {
        const result = await uploadImage(
            { path: tempSourcePath, filename: "photo.pdf", mimetype: "application/pdf", size: 4 },
            uploadDir
        );

        expect(result.list_errors.length).toBeGreaterThan(0);
        expect(result.image_path).toBeUndefined();
        expect(fs.existsSync(uploadDir)).toBe(false);
    });
});
