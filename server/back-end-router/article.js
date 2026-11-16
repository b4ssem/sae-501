import express from "express";
import mongoose from "mongoose";

import routeName from "#server/utils/name-route.middleware.js";
import upload from "#server/utils/uploader.js";
import { buildPayload } from "#server/utils/build-payload.js";

import { ressourceNameInApi } from "./utils.js";

const base = "articles";
const router = express.Router();

const fetchAuthors = async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/${ressourceNameInApi.authors}?per_page=100`);
    const data = await response.json();
    return response.ok ? data : { data: [] };
};

// Get multiple articles
router.get(`/${base}`, routeName("articles_list"), async (req, res) => {
    let result = {};
    let listErrors = [];

    const queryParams = new URLSearchParams(req.query);
    const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}?${queryParams.toString()}`);
    const data = await response.json();

    if (response.ok) {
        result = data;
    } else {
        listErrors = data.list_errors;
    }

    res.render("pages/back-end/articles/list.njk", {
        list_articles: result,
        list_errors: listErrors,
    });
});

router
    .route([`/${base}/:id([a-f0-9]{24})`, `/${base}/add`])
    .get(routeName("article_form"), async (req, res) => {
        const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

        let result = {};
        let listErrors = [];

        if (isEdit) {
            const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}/${req.params.id}`);
            const data = await response.json();

            if (response.ok) {
                result = data;
            } else {
                listErrors = data.list_errors;
            }
        }

        const listAuthors = await fetchAuthors(res.locals.base_url);

        res.render("pages/back-end/articles/add-edit.njk", {
            article: result,
            list_errors: listErrors,
            list_authors: listAuthors,
            is_edit: isEdit,
        });
    })
    .post(routeName("article_form"), upload.single("image"), async (req, res) => {
        let ressource = {};
        const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

        let listErrors = [];

        const options = {
            method: isEdit ? "PUT" : "POST",
            body: buildPayload(req.body, req.file),
        };

        const url = isEdit
            ? `${res.locals.base_url}/api/${ressourceNameInApi.articles}/${req.params.id}`
            : `${res.locals.base_url}/api/${ressourceNameInApi.articles}`;

        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
            ressource = data;
            req.flash(
                "success",
                isEdit ? "Article mis à jour" : "Article crée",
            );
        } else {
            listErrors = data.list_errors;
            ressource = data.ressource;
        }

        if (isEdit || listErrors.length) {
            const listAuthors = await fetchAuthors(res.locals.base_url);

            res.render("pages/back-end/articles/add-edit.njk", {
                article: ressource,
                list_errors: listErrors,
                list_authors: listAuthors,
                is_edit: isEdit,
            });
        } else {
            res.redirect(`${res.locals.admin_url}/${base}`);
        }
    });

export default router;
