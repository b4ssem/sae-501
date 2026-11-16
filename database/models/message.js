import mongoose, { Schema } from "mongoose";
import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";

export const MessageZodSchema = z.object({
    firstname: z
        .string({
            error: errorRequiredMessage("un prénom"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un prénom") }),
    lastname: z
        .string({
            error: errorRequiredMessage("un nom"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un nom") }),
    email: z.email({ error: "Veuillez mettre un email valide" }).trim(),
    message: z
        .string({
            error: errorRequiredMessage("un message"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un message") }),
    identity: z
        .enum(["none", "student", "parent", "other"], {
            error: "Veuillez choisir un profil valide",
        })
        .default("none"),
});

const messageSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    identity: {
        type: String,
        enum: ["none", "student", "parent", "other"],
        default: "none",
    },
});

export default mongoose.model("Message", messageSchema);
