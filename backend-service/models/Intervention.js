const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterventionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        token_amount: {
            type: Number,
            required: true,
        },
        wallet_address: {
            type: String,
            required: true,
        },
        file: {
            type: String,
        },
        nft_name: {
            type: String,
            required: true
        },
        nft_description: {
            type: String,
            required: true
        },
        nft_price: {
            type: Number,
            required: true
        },
        nft_image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Intervention = mongoose.model(
    "Intervention",
    InterventionSchema
);
