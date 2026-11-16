import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const defaultOpenHousePath = path.join(__dirname, "..", "..", "src", "data", "open-house.json");

// Reads the open house date/time from disk (always fresh: not the startup-time cache used for other src/data/*.json files).
export const getOpenHouse = async (targetPath = defaultOpenHousePath) => {
    const content = await fs.readFile(targetPath, "utf8");
    return JSON.parse(content).open_house;
};

export const saveOpenHouse = async (data, targetPath = defaultOpenHousePath) => {
    const payload = { open_house: data };
    await fs.writeFile(targetPath, JSON.stringify(payload, null, 4));
    return data;
};
