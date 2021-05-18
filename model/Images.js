const mongoose = require('mongoose');
require('../model/User')
const Schema = mongoose.Schema;

const Images = new Schema({
    user_id: {
        type: String
    },
    name: String,
    image: {
        data: Buffer,
        contentType: String
    },
    tags: {
        type:String
    }
})

const UserImages = mongoose.model("Image", Images)

module.exports = UserImages