const {Schema, model} = require("mongoose");

const userSchema = new Schema(
    {
        name: { type:String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
    },
);

module.exports = model("User", userSchema);