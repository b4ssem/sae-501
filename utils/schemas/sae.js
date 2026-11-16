import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";

export const SaeZodSchema = z.object({
    title: z
        .string({
            error: errorRequiredMessage("un titre"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un titre") }),
    content: z
        .string({
            error: errorRequiredMessage("une biographie"),
        })
        .max(200, 'Le champ "bio" ne peut pas dépasser 300 caractères'),
    image: z.string().optional(),
});
