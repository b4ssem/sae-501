 import express from "express";
import { ZodError } from "zod";

import Message, { MessageZodSchema } from "#models/message.js";
import routeName from "#server/utils/name-route.middleware.js";

 import { mapZodErrors } from "#database/error-messages.js";

const router = express.Router();
const base = "messages";

router.get(`/${base}`, routeName("message_list_api"), async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    let perPage = Number(req.query.per_page) || 7;
    // Borne la valeur entre 1 et 20
    perPage = Math.min(Math.max(perPage, 1), 20);

    try {
        // Le tri sur _id décroissant donne les messages les plus récents en premier
        const listRessources = await Message.aggregate([
            { $sort: { _id: -1 } },
            { $skip: (page - 1) * perPage },
            { $limit: perPage },
        ]);

        const count = await Message.countDocuments();

        const queryParam = { ...req.query };
        delete queryParam.page;

        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
            query_params: (new URLSearchParams(queryParam)).toString(),
        });
    } catch (e) {
        res.status(400).json({
            list_errors: [
                ...Object.values(
                    e?.errors || [{ message: e?.message || "Il y a eu un problème" }]
                ).map(val => val.message),
            ],
        });
    }
});

router.post(`/${base}`, routeName("message_api"), async (req, res) => {
    let listErrors = [];

    try {
        // On valide, via zod, le format des données.
        // Si ça se passe mal, zod va automatique lever une erreur
        // ce qui nous fera sortir du try et atterrir dans le catch
        // où une erreur sera revoyée sous format json
        const payloadValidated = MessageZodSchema.parse(req.body);
        const ressource = new Message(payloadValidated);
        await ressource.save();

        return res.status(201).json(ressource);
    } catch (error) {
        if (error instanceof ZodError) {
            listErrors.push(...mapZodErrors(error.issues));
        }

        return res.status(400).json({
            list_errors: [
                ...(
                    listErrors || [{ message: "Quelque chose s'est mal passé" }]
                ).map((val) => val.message),
            ],
            ressource: req.body,
            error_fields: listErrors.map((val) => val.field),
        });
    }
});

export default router;