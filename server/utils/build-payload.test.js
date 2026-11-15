import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildPayload } from "./build-payload.js";

describe("buildPayload", () => {
    it("should return a JSON string when there is no file", () => {
        const result = buildPayload({ title: "Hello" }, null);

        expect(result).toBe(JSON.stringify({ title: "Hello" }));
    });

    it("should default to an empty body when none is given", () => {
        const result = buildPayload();

        expect(result).toBe("{}");
    });

    describe("with a file", () => {
        let tempFilePath;

        beforeEach(() => {
            tempFilePath = path.join(os.tmpdir(), `build-payload-test-${Date.now()}.png`);
            fs.writeFileSync(tempFilePath, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
        });

        afterEach(() => {
            fs.rmSync(tempFilePath, { force: true });
        });

        it("should return a FormData instance", () => {
            const file = { path: tempFilePath, fieldname: "image", originalname: "photo.png", mimetype: "image/png" };

            const result = buildPayload({ title: "Hello" }, file);

            expect(result).toBeInstanceOf(FormData);
        });

        it("should append the body fields and the file under its fieldname", async () => {
            const file = { path: tempFilePath, fieldname: "image", originalname: "photo.png", mimetype: "image/png" };

            const result = buildPayload({ title: "Hello" }, file);

            expect(result.get("title")).toBe("Hello");
            const uploadedFile = result.get("image");
            expect(uploadedFile).toBeInstanceOf(Blob);
            expect(uploadedFile.name).toBe("photo.png");
            expect(uploadedFile.type).toBe("image/png");

            const uploadedBytes = Buffer.from(await uploadedFile.arrayBuffer());
            expect(uploadedBytes).toEqual(fs.readFileSync(tempFilePath));
        });
    });
});
