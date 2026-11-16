import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";
import { findEmailDomainTypo } from "../email.js";

export const AuthorZodSchema = z.object({
    lastname: z
        .string({
            error: errorRequiredMessage("un nom de famille"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un nom de famille") }),
    firstname: z
        .string({ error: errorRequiredMessage("un prénom") })
        .trim()
        .min(1, { error: errorRequiredMessage("un prénom") }),
    email: z
        .email({ error: "Veuillez mettre un email valide" })
        .trim()
        .superRefine((value, ctx) => {
            const suggestion = findEmailDomainTypo(value);
            if (suggestion) {
                ctx.addIssue({
                    code: "custom",
                    message: `Cette adresse ressemble à une faute de frappe, vouliez-vous dire "${suggestion}" ?`,
                });
            }
        }),
    image: z.string({ error: "Image obligatoire" }).trim().min(1, { error: "Image obligatoire" }),
    bio: z
        .string()
        .max(300, 'Le champ "bio" ne peut pas dépasser 300 caractères'),
});
