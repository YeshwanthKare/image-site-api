const mongoose = require('mongoose');
const User = require('../model/User')
const Schema = mongoose.Schema;

const Images = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const UserImages = mongoose.model("Image", Images)

module.exports = UserImages