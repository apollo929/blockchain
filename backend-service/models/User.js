const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        user_role: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
            required: true,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_wallet_address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = User = mongoose.model("User", UserSchema);
