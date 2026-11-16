import { getRemainingChars } from "#utils-shared";

const listTextareas = document.querySelectorAll("[data-char-counter]");

listTextareas.forEach((textarea) => {
    const limit = Number(textarea.getAttribute("maxlength"));
    const output = document.querySelector(`[data-char-counter-output="${textarea.dataset.charCounter}"]`);

    if (!output || !limit) {
        return;
    }

    const updateCounter = () => {
        output.textContent = `${getRemainingChars(textarea.value, limit)} caractères restants`;
    };

    updateCounter();
    textarea.addEventListener("input", updateCounter);
});
