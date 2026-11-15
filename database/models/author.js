import mongoose, { Schema } from "mongoose";

import { AuthorZodSchema } from "#schemas/author.js";

import Article from "./article.js";

const defaultColor = "#ff0000";

export { AuthorZodSchema };

const authorSchema = new Schema({
    lastname: {
        type: String,
    },
    firstname: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    },
    color: {
        type: String,
        default: defaultColor,
    },
    list_articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
});

const HEX_COLOR_REGEX = /^#([0-9]{6}|[0-9]{3}|[0-9]{8}|[0-9]{4})$/i;
authorSchema.pre("save", function (next) {
    this.color = this.color.trim();
    if (!HEX_COLOR_REGEX.test(this.color)) {
        this.color = defaultColor;
    }

    next();
});

authorSchema.pre("findOneAndUpdate", function (next) {
    try {
        this._update.color = this._update.color.trim();
        if (!HEX_COLOR_REGEX.test(this.color)) {
            this._update.color = defaultColor;
        }
    } catch {}

    next();
});

authorSchema.pre(
    "findOneAndDelete",
    { document: true, query: true },
    async function (next) {
        try {
            // Unset all articles' author
            await Article.updateMany(
                { author: this.getQuery()._id },
                { author: null }
            );
        } catch {}

        next();
    }
);

authorSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Author", authorSchema);
