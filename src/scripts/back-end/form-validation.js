import { ArticleZodSchema } from "#schemas/article.js";
import { SaeZodSchema } from "#schemas/sae.js";
import { AuthorZodSchema } from "#schemas/author.js";

// Only the text fields make sense to check before the page even reaches the server
// (image is conditionally required depending on create/edit, handled server-side).
const schemas = {
    article: ArticleZodSchema.pick({ title: true, content: true }),
    sae: SaeZodSchema.pick({ title: true, content: true }),
    author: AuthorZodSchema.pick({ firstname: true, lastname: true, email: true }),
};

const renderErrors = (container, messages) => {
    container.innerHTML = "";
    messages.forEach((message) => {
        const paragraph = document.createElement("p");
        paragraph.className = "rounded-lg p-3 bg-red-100 text-red-800 border-solid border-x border-y border-red-700 mb-3";
        paragraph.textContent = message;
        container.append(paragraph);
    });
};

document.querySelectorAll("[data-validate-schema]").forEach((form) => {
    const schema = schemas[form.dataset.validateSchema];
    const errorContainer = form.querySelector("[data-client-errors]");

    if (!schema || !errorContainer) {
        return;
    }

    form.addEventListener("submit", (event) => {
        const payload = Object.fromEntries(new FormData(form).entries());
        const result = schema.safeParse(payload);

        if (result.success) {
            renderErrors(errorContainer, []);
            return;
        }

        event.preventDefault();
        renderErrors(errorContainer, result.error.issues.map((issue) => issue.message));
        errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});
