// Extracts a YouTube video id from a raw id, a watch/short/shorts/embed url or an <iframe> embed code.
export const extractYoutubeId = (input) => {
    const value = (input || "").trim();

    if (!value) {
        return null;
    }

    const idPattern = /^[\w-]{11}$/;
    if (idPattern.test(value)) {
        return value;
    }

    const urlPatterns = [
        /youtu\.be\/([\w-]{11})/,
        /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
        /youtube\.com\/embed\/([\w-]{11})/,
        /youtube\.com\/shorts\/([\w-]{11})/,
    ];

    for (const pattern of urlPatterns) {
        const match = value.match(pattern);
        if (match) {
            return match[1];
        }
    }

    return null;
};
