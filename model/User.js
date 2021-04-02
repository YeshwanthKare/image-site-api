const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require("express");


const UserDB = new Schema({
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

const model = mongoose.model("User", UserDB);
module.exports = model