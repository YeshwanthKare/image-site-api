const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../model/User');
const Images = require('../model/Images')


const Tags = new Schema({
    image_id: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    tagNames: {
        type: String,
        required: true
    },
    
})

const ImageTags = mongoose.model("Tag", Tags)

module.exports = ImageTags