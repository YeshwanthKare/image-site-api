const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../model/User")
const Settings = require("../model/Settings")
const Image = require("../model/Images")
const mongoose = require("mongoose")
const { Schema } = mongoose;
const fs = require("fs")
const path = require("path")
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


let uploadField = upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]) 

router.post('/settings', uploadField, async(req, res) => {
    console.log(req.body)
    const avatarFilePath = req.files['profileImage'][0].path.replace("\\", "/")
    const coverFilePath = req.files['coverImage'][0].path.replace("\\","/")
   

    let settings = new Settings({
        user_id: req.body.user_id,
        username: req.body.username,
        profileImage: avatarFilePath,
        coverImage: coverFilePath,
        city: req.body.city,
        country: req.body.country

    })

    try{
        let userSettings = await settings.save((err, setting) => {
            if(err) {
                console.log(err)
                res.send(400,{
                    status: err
                })
            }else{
                res.send({
                    status:"settings save"
                })
                console.log(setting)
            }
            console.log("saved settings")
        });
    }catch(err){
        res.send(err)
    }

    // res.json({settings})
})

router.patch("/settings/:name", async(req, res) => {
    const name = req.params.name
    console.log(name)
    res.send(name)
})


router.post("/image", upload.single("image"), async (req, res) => {

    console.log(req.file)
    // const filePath = req.file.filename
    const filePath = req.file.path.replace("\\","/")
    console.log(req.body.tags)
    console.log(filePath)

    let Images = new Image({
        user_id: req.body.user_id,
        name: req.body.name,
        image: filePath,
        tags: req.body.tags
        
    })
    console.log(Images)
    // res.json({Images})

    try{
        let userImages = await Images.save((err, doc) => {
            if(err) {
                console.log(err)
                res.send(400,{
                    status: err
                })
            }else{
                res.send({
                    status:"image uploaded"
                })
                console.log(doc)
            }
            console.log("upload success")
        });
    }catch(err){
        res.send(err)
    }
    
})

router.get("/image", async(req, res) => {
    let allImages = await Image.find({}, (err, img) => {
        if(err){
            console.log(err)
        }else{
            res.send(img)
        }
    })
})


router.get("/image/:id",  async(req, res) => {

    let postId = req.params.id;
    console.log(postId)
    // res.send(postId)



    try{
        let images = await Image.findOne({ _id: postId }, (err,doc) => {
            if(err){
                res.send(err)
            }else{
                res.send(doc)
                // res.contentType(doc.image.contentType)
                console.log(doc)
            }

        })
        // console.log(images)

    }catch(err){
        console.log(err)
        res.send(err)
    }


})

// router.post("/", async(req, res) => {
//     Image.findOneAndDelete({ _id: "60a3b650448e9921e08c93c8"}, (err, item) => {
//         if(err){
//             throw new Error("Something went wrong")
//         }else{
//             res.send(200, {
//                 message: item
//             })
//             console.log("deleted")
//         }
//     })
// })

router.get("/settings", async(req, res) => {
    try{
        let settings = await Settings.find({}, (err, setting) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(setting)
            }
        })
    }catch(err){
        res.send(err)
    }
})






module.exports = router



