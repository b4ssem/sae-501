import fs from "node:fs";

export const buildPayload = (body = {}, file = null) => {
    if (!file) {
        return JSON.stringify(body);
    }

    const form = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        form.append(key, value);
    });

    const fileBuffer = fs.readFileSync(file.path);
    const blob = new Blob([fileBuffer], { type: file.mimetype });
    form.append(file.fieldname, blob, file.originalname);

    return form;
};
