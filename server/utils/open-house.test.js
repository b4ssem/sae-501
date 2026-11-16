import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getOpenHouse, saveOpenHouse } from "./open-house.js";

describe("open-house", () => {
    let tempPath;

    beforeEach(() => {
        tempPath = path.join(os.tmpdir(), `open-house-test-${Date.now()}.json`);
    });

    afterEach(async () => {
        await fs.rm(tempPath, { force: true });
    });

    it("should write then read back the same data", async () => {
        const data = { date: "2026-03-15", start_time: "09:00", end_time: "18:00" };

        await saveOpenHouse(data, tempPath);
        const result = await getOpenHouse(tempPath);

        expect(result).toEqual(data);
    });

    it("should write valid, readable JSON (stringified, not an object)", async () => {
        await saveOpenHouse({ date: "2026-03-15" }, tempPath);

        const raw = await fs.readFile(tempPath, "utf8");
        expect(typeof raw).toBe("string");
        expect(JSON.parse(raw)).toEqual({ open_house: { date: "2026-03-15" } });
    });

    it("should overwrite previous data on a second save", async () => {
        await saveOpenHouse({ date: "2026-01-01" }, tempPath);
        await saveOpenHouse({ date: "2026-12-25" }, tempPath);

        const result = await getOpenHouse(tempPath);
        expect(result.date).toBe("2026-12-25");
    });
});
