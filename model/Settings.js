const mongoose = require('mongoose');
require('../model/User')
const Schema = mongoose.Schema;

const UserSettings = new Schema({
    user_id: {
        type: String,
    },
    username: {
        type: String
    },
    profileImage: {
        type: String
    },
    coverImage:{
        type: String
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