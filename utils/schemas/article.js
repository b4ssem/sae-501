import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";

export const ArticleZodSchema = z.object({
    title: z
        .string({
            error: errorRequiredMessage("un titre"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un titre") }),
    abstract: z.string().optional(),
    content: z
        .string({
            error: errorRequiredMessage("un corps de texte"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un corps de texte") }),
    image: z.string({ error: "Image obligatoire" }).trim().min(1, { error: "Image obligatoire" }),
    yt_video_id: z.string().optional(),
    is_active: z.coerce.boolean().default(false),
    author: z.string().optional(),
});
