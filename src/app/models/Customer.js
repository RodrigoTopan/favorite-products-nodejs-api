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
        },
        favoriteProducts: {
            type: [ProductSchema],
            required: false,
        },
    },
    { timestamps: true }
);

export default model("Customer", schema);
