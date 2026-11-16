import express from "express";

import routeName from "#server/utils/name-route.middleware.js";

import { ressourceNameInApi } from "./utils.js";

const base = "messages";
const router = express.Router();

// Get multiple messages
router.get(`/${base}`, routeName("message_list"), async (req, res) => {
    let result = {};
    let listErrors = [];

    const queryParams = new URLSearchParams(req.query).toString();
    const response = await fetch(
        `${res.locals.base_url}/api/${ressourceNameInApi.messages}?${queryParams}`
    );
    const data = await response.json();

    if (response.ok) {
        result = data;
    } else {
        listErrors = data.list_errors;
    }

    res.render("pages/back-end/messages/list.njk", {
        list_messages: result,
        list_errors: listErrors,
    });
});

export default router;
