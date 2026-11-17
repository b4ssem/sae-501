import express from "express";

import routeName from "#server/utils/name-route.middleware.js";
import parseManifest from "#server/utils/parse-manifest.js";
import { getOpenHouse } from "#server/utils/open-house.js";

const router = express.Router();

router.use(async (_req, res, next) => {
    const originalRender = res.render;
    res.render = async function (view, local, callback) {
        const manifest = {
            manifest: await parseManifest("frontend.manifest.json"),
        };

        const args = [view, { ...local, ...manifest }, callback];
        originalRender.apply(this, args);
    };

    next();
});

router.get("/", routeName("homepage"), async (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString();
    let result = {};
    try {
        result = await fetch(`${res.locals.base_url}/api/articles?${queryParams}&is_active=true`);
    } catch (_error) {}

    let openHouse = {};
    try {
        openHouse = await getOpenHouse();
    } catch (_error) {}

    res.render("pages/front-end/index.njk", {
        list_articles: result.data,
        open_house: openHouse,
    });
});

// "(.html)?" makes ".html" optional in the url
router.get("/a-propos(.html)?", routeName("about"), async (_req, res) => {
    let result = {};
    try {
        result = await fetch(`${res.locals.base_url}/api/saes?per_page=9`);
    } catch (_error) {}

    res.render("pages/front-end/about.njk", {
        list_saes: result.data,
    });
});

router.get("/lieux(.html)?", routeName("lieux"), async (_req, res) => {
    let result = {};
    try {
        result = await fetch(`${res.locals.base_url}/api/saes?per_page=9`);
    } catch (_error) {}

    res.render("pages/front-end/lieux.njk", {
        list_saes: result.data,
    });
});

router.get("/articles/:id([a-f0-9]{24})", routeName("article_detail"), async (req, res) => {
    const response = await fetch(`${res.locals.base_url}/api/articles/${req.params.id}`);

    if (!response.ok) {
        return res.status(404).render("pages/404.njk");
    }

    const article = await response.json();

    let comments = { list_comments: [] };
    try {
        const commentsResponse = await fetch(`${res.locals.base_url}/api/articles/${req.params.id}/comments`);
        comments = await commentsResponse.json();
    } catch (_error) {}

    res.render("pages/front-end/article.njk", {
        article,
        list_comments: comments.list_comments,
    });
});

router.get("/sur-les-medias(.html)?", routeName("sur-les-medias"), async (_req, res) => {
    let result = {};
    try {
        result = await fetch(`${res.locals.base_url}/api/saes?per_page=9`);
    } catch (_error) {}

    res.render("pages/front-end/sur-les-medias.njk", {
        list_saes: result.data,
    });
});

export default router;
