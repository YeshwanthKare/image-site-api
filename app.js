const express = require("express");
const app = express();
const port = 3002;
const mongoose = require("mongoose");
require("dotenv").config();
const pathRoute = require("./routes/users")
// const User = require("./model/User");
const cors = require("cors")
// const multer = require("multer")
// const Schema = mongoose.Schema

app.use(express.json());
app.use(express.static("uploads"))

app.use(cors());

// "mongodb://localhost:27017/ImageSite"

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
.then(() => {
    console.log("connected to DB")
})
.catch(err => {
    console.log(err)
})


app.use("/users", pathRoute )


app.listen(port, () => {
    console.log(`App listening to http://localhost:${port}`);
})



