const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
require("dotenv").config();
const pathRoute = require("./routes/users")
const cors = require("cors")


app.use(express.json());
app.use("/uploads",express.static("uploads"))
app.use(cors())

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


app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`);
})



