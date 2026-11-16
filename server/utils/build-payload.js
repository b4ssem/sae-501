import fs from "node:fs";

export const buildPayload = (body = {}, file = null) => {
    const form = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        form.append(key, value);
    });

    if (file) {
        form.append(
            file.fieldname,
            new Blob([fs.readFileSync(file.path)], { type: file.mimetype }),
            file.originalname
        );
    }

    return form;
};
