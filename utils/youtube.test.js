import { describe, expect, it } from "vitest";
import { extractYoutubeId } from "./youtube.js";

describe("extractYoutubeId", () => {
    it("should return the id as-is when given a bare video id", () => {
        expect(extractYoutubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should extract the id from a watch url", () => {
        expect(extractYoutubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should extract the id from a watch url with extra query params", () => {
        expect(extractYoutubeId("https://www.youtube.com/watch?list=PL123&v=dQw4w9WgXcQ&t=10s")).toBe("dQw4w9WgXcQ");
    });

    it("should extract the id from a short youtu.be url", () => {
        expect(extractYoutubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should extract the id from an embed url", () => {
        expect(extractYoutubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should extract the id from a shorts url", () => {
        expect(extractYoutubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should return null for an invalid value", () => {
        expect(extractYoutubeId("not a youtube link")).toBeNull();
    });

    it("should return null for an empty value", () => {
        expect(extractYoutubeId("")).toBeNull();
        expect(extractYoutubeId(undefined)).toBeNull();
    });
});
