// Returns how many characters are left before hitting limit (never negative).
export const getRemainingChars = (text, limit) => {
    const length = (text || "").length;
    return Math.max(0, limit - length);
};
