const mongoose = require('mongoose');
require('../model/User')
const Schema = mongoose.Schema;

const Images = new Schema({
    user_id: {
        type: String
    },
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
        type:String,
        required: true
    }]
})

const UserImages = mongoose.model("Image", Images)

module.exports = UserImages