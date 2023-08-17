const {Schema, model} = require("mongoose");

const User = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    registration: { type: Date, default: Date.now() },
    logindate: {type: Date, default: Date.now()},
    status: {type: String, default: 'unblocked'}
})

module.exports = model("User", User);