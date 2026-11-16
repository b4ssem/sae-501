import mongoose, { Schema } from "mongoose";

import { SaeZodSchema } from "#schemas/sae.js";

export { SaeZodSchema };

const saeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    image: String,
});

export default mongoose.model("SAE", saeSchema);
