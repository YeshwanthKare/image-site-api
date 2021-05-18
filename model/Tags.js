const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../model/User');
require('../model/Images')


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