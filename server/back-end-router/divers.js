import express from "express";
import * as z from "zod";

import routeName from "#server/utils/name-route.middleware.js";
import { getOpenHouse, saveOpenHouse } from "#server/utils/open-house.js";
import { errorRequiredMessage, mapZodErrors } from "#database/error-messages.js";
import upload from "#server/utils/uploader.js";

const router = express.Router();

const OpenHouseZodSchema = z.object({
    date: z
        .string({ error: errorRequiredMessage("une date") })
        .trim()
        .min(1, { error: errorRequiredMessage("une date") }),
    start_time: z.string().trim().optional(),
    end_time: z.string().trim().optional(),
});

router
    .route("/divers")
    .get(routeName("divers"), async (req, res) => {
        let openHouse = {};
        let listErrors = [];

        try {
            openHouse = await getOpenHouse();
        } catch (_error) {
            listErrors = ["Impossible de lire le fichier open-house.json"];
        }

        res.render("pages/back-end/divers.njk", {
            open_house: openHouse,
            list_errors: listErrors,
        });
    })
    .post(routeName("divers"), upload.none(), async (req, res) => {
        let listErrors = [];
        let openHouse = req.body;

        try {
            const payloadValidated = OpenHouseZodSchema.parse(req.body);
            openHouse = await saveOpenHouse(payloadValidated);
            req.flash("success", "Date des journées portes ouvertes mise à jour");
        } catch (error) {
            if (error instanceof z.ZodError) {
                listErrors = mapZodErrors(error.issues).map((item) => item.message);
            } else {
                listErrors = ["Impossible d'enregistrer le fichier open-house.json"];
            }
        }

        res.render("pages/back-end/divers.njk", {
            open_house: openHouse,
            list_errors: listErrors,
        });
    });

export default router;
