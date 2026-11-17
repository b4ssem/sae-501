import { DateTime } from "luxon";

const section = document.querySelector("[data-comments-section]");

if (section) {
    const articleId = section.dataset.articleId;
    const form = section.querySelector("[data-comment-form]");
    const list = section.querySelector("[data-comments-list]");
    const countElement = section.querySelector("[data-comments-count]");
    const errorsElement = section.querySelector("[data-comment-errors]");
    const noCommentsElement = section.querySelector("[data-no-comments]");
    const template = document.querySelector('[data-tpl-id="comment-item"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const textarea = form.querySelector("textarea");
        const content = textarea.value.trim();

        errorsElement.classList.add("hidden");
        errorsElement.textContent = "";

        if (!content) {
            return;
        }

        const submitButton = form.querySelector("button[type=submit]");
        submitButton.disabled = true;

        try {
            const response = await fetch(`/api/articles/${articleId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();

            if (!response.ok) {
                errorsElement.textContent = (data.list_errors || ["Quelque chose s'est mal passé"]).join(" ");
                errorsElement.classList.remove("hidden");
                return;
            }

            noCommentsElement?.remove();

            const clone = template.content.cloneNode(true);
            clone.querySelector("[data-comment-content]").textContent = data.content;
            clone.querySelector("[data-comment-date]").textContent = DateTime.fromISO(data.created_at).toFormat("dd/LL/yyyy à HH:mm");
            list.prepend(clone);

            countElement.textContent = Number(countElement.textContent) + 1;
            textarea.value = "";
        } catch (_error) {
            errorsElement.textContent = "Quelque chose s'est mal passé, veuillez réessayer";
            errorsElement.classList.remove("hidden");
        } finally {
            submitButton.disabled = false;
        }
    });
}
