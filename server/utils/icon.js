import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heroiconsRoot = path.join(__dirname, "..", "..", "node_modules", "heroicons");

const cache = new Map();

export default function icon(name, { variant = "outline", size = 24, className = "w-6 h-6" } = {}) {
    const cacheKey = `${size}/${variant}/${name}`;

    if (!cache.has(cacheKey)) {
        const filePath = path.join(heroiconsRoot, String(size), variant, `${name}.svg`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Icône "${name}" introuvable (${cacheKey}). Vérifiez le nom sur https://heroicons.com/`);
        }

        cache.set(cacheKey, fs.readFileSync(filePath, "utf8"));
    }

    return cache
        .get(cacheKey)
        .replace("<svg ", `<svg focusable="false" class="${className}" `);
}
