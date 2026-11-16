import { extractYoutubeId } from "#utils-shared";

const listInputs = document.querySelectorAll("[data-youtube-input]");

listInputs.forEach((input) => {
    const key = input.dataset.youtubeInput;
    const preview = document.querySelector(`[data-youtube-preview="${key}"]`);
    const errorMessage = document.querySelector(`[data-youtube-error="${key}"]`);
    const iframe = preview?.querySelector("iframe");

    if (!preview || !errorMessage || !iframe) {
        return;
    }

    const updatePreview = () => {
        const rawValue = input.value.trim();

        if (!rawValue) {
            preview.classList.add("hidden");
            errorMessage.classList.add("hidden");
            iframe.removeAttribute("src");
            return;
        }

        const videoId = extractYoutubeId(rawValue);

        if (!videoId) {
            preview.classList.add("hidden");
            errorMessage.classList.remove("hidden");
            iframe.removeAttribute("src");
            return;
        }

        input.value = videoId;
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        preview.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    };

    updatePreview();
    input.addEventListener("blur", updatePreview);
});
