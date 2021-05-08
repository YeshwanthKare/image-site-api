const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserDB = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", UserDB);


module.exports = User