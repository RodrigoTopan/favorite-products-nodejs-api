import { Schema, model } from "mongoose";

import ProductSchema from "./Product";

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        favoriteProducts: {
            type: [ProductSchema],
            default: [],
            unique: true,
            index: true,
        },
    },
    { timestamps: true },
);

export default model("Customer", schema);
