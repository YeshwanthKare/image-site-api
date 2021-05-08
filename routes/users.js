const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../model/User")
// const file = require("/upload")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

var upload = multer({ storage: storage });


router.post("/register", async (req, res) => {

    let Users = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
    })

    try{
        let UserPost = await Users.save((err, user) => {
            if(err) {
                console.log(err)
                res.send(400,{
                    status: err
                })
            }else{
                res.send({
                    status:"registered"
                })
                console.log(user)
            }
            console.log("all is good")
        });
    }catch(err){
        res.send(err)
    }
    
})

router.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email, password: password}, (err, user) => {
        if(user){
            res.send({
                status:"valid", 
                token: user.id
            })
            console.log(user)
        }else{
            res.send(400,{
                status:"Not Found"
            })
            console.log(err)
        }
    })
})





module.exports = router



