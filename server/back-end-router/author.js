import express from "express";
import mongoose from "mongoose";

import { ressourceNameInApi } from "./utils.js";

import routeName from "#server/utils/name-route.middleware.js";
import upload from "#server/utils/uploader.js";
import { buildPayload } from "#server/utils/build-payload.js";

const base = "auteurs";
const router = express.Router();

// Get multiple authors
router.get(`/${base}`, routeName("author_list"), async (req, res) => {
    const queryParams = new URLSearchParams({ per_page: 7, ...req.query });

    let result = {};
    let listErrors = [];

    const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}?${queryParams.toString()}`);
    const data = await response.json();

    if (response.ok) {
        result = data;
    } else {
        listErrors = data.list_errors;
    }

    res.render("pages/back-end/authors/list.njk", {
        list_authors: result,
        list_errors: listErrors,
    });
});

router
    .route([`/${base}/:id([a-f0-9]{24})`, `/${base}/add`])
    .get(routeName("author_form"), async (req, res) => {
        // Get or create author
        const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

        let result = {};
        let listErrors = [];

        if (isEdit) {
            const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}/${req.params.id}`);
            const data = await response.json();

            if (response.ok) {
                result = data;
            } else {
                listErrors = data.list_errors;
            }
        }

        res.render("pages/back-end/authors/add-edit.njk", {
            author: result,
            list_errors: listErrors,
            is_edit: isEdit,
        });
    })
    .post(routeName("author_form"), upload.single("image"), async (req, res) => {
        // Create or update author
        let ressource = {};
        const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);
        let listErrors = [];
        let options = {
            body: buildPayload(req.body, req.file),
        };

        let url = '';
        if (isEdit) {
            options = {
                ...options,
                method: "PUT",
            };
            url = `${res.locals.base_url}/api/${ressourceNameInApi.authors}/${req.params.id}`;
        } else {
            options = {
                ...options,
                method: "POST",
            };
            url = `${res.locals.base_url}/api/${ressourceNameInApi.authors}`;
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
            ressource = data;
            req.flash(
                "success",
                isEdit ? "Element mis à jour" : "Element crée",
            );
        } else {
            listErrors = data.list_errors;
            ressource = data.ressource;
        }

        if (listErrors.length || isEdit) {
            res.render("pages/back-end/authors/add-edit.njk", {
                author: ressource,
                list_errors: listErrors,
                is_edit: isEdit,
            });
        } else {
            res.redirect(`${res.locals.admin_url}/${base}`);
        }
    });

export default router;
