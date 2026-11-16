import { describe, expect, it } from "vitest";
import { findEmailDomainTypo } from "./email.js";

describe("findEmailDomainTypo", () => {
    it("should catch a missing letter in a known provider's TLD", () => {
        expect(findEmailDomainTypo("sevyns@gmail.co")).toBe("sevyns@gmail.com");
    });

    it("should catch other common typos of known providers", () => {
        expect(findEmailDomainTypo("jean@hotmail.con")).toBe("jean@hotmail.com");
        expect(findEmailDomainTypo("ada@yahoo.cm")).toBe("ada@yahoo.com");
    });

    it("should accept the correct domain of a known provider", () => {
        expect(findEmailDomainTypo("sevyns@gmail.com")).toBeNull();
        expect(findEmailDomainTypo("jean@outlook.fr")).toBeNull();
    });

    it("should not flag a legitimate domain just because its TLD is short", () => {
        expect(findEmailDomainTypo("contact@my-startup.co")).toBeNull();
        expect(findEmailDomainTypo("contact@cyu.fr")).toBeNull();
    });

    it("should not flag a different, unrelated domain that happens to be close to a provider's name", () => {
        // "mail.com" is itself a real, legitimate email provider — must not be
        // confused with "gmail.com" just because they're one letter apart.
        expect(findEmailDomainTypo("someone@mail.com")).toBeNull();
    });

    it("should return null for an empty or malformed value", () => {
        expect(findEmailDomainTypo("")).toBeNull();
        expect(findEmailDomainTypo(undefined)).toBeNull();
        expect(findEmailDomainTypo("pas-un-email")).toBeNull();
    });

    it("should be case-insensitive", () => {
        expect(findEmailDomainTypo("Sevyns@GMAIL.CO")).toBe("sevyns@gmail.com");
    });
});
