const express = require("express");
const app = express();
const port = 3002;
const mongoose = require("mongoose");
require("dotenv").config();
const pathRoute = require("./routes/users")
const User = require("./model/User");
const cors = require("cors")

app.use(express.json());

app.use(cors());



mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
.then(() => {
    console.log("connected to DB")
})

app.use("/users", pathRoute )


// app.get("/", (req, res) => {
//     res.send("<h1>hello how are you doing</h1>");
// })

app.listen(port, () => {
    console.log(`App listening to http://localhost:${port}`);
})



