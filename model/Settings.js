const mongoose = require('mongoose');
const User = require('../model/User')
const Schema = mongoose.Schema;

const UserSettings = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String
    },
    profileImage: {
        data: Buffer,
        contentType: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

const Settings = mongoose.model("Setting", UserSettings)

module.exports = Settings