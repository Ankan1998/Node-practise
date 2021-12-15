const express = require('express')
require('../mongoose')
const User = require('../model/user_model')
const auth = require('../middleware/user_middleware')
const multer = require('multer')
const router = new express.Router()

// User profile 
router.get('/users/me', auth, async (req, res) => {
    return res.send(req.user)
})

// new user signup
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateToken(user._id)
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.matchCred(req.body.mobileNo, req.body.password)
        const token = await user.generateToken(user._id)
        return res.status(200).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

// User logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        req.user.save()
        res.send("User logged out")
    } catch(e) {
        res.status(400).send()
    }

})

//User logout All
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        req.user.save()
        res.send("User logged out fromm All places")
    } catch(e) {
        res.status(400).send()
    }

})

//Update user
router.patch('/users/update', auth, async (req, res) => {
    const changes = Object.keys(req.body) // Convert json fields to array 
    const allowedChanges = ['name', 'email', 'password']
    const isValidChange = changes.every((change) => {
        return allowedChanges.includes(change)
    })
    if (!isValidChange) {
        return res.status(400).send()
    }
    try {
        changes.forEach((change) => {
            req.user[change] = req.body[change]
        })

        await req.user.save()
        if (!req.user) {
            return res.status(404).send()
        }

        res.send(req.user)

    } catch (e) {
        res.status(400).send()
    }
})

// delete user
router.delete('/users/delete', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)

    } catch(e) {
        res.status(400).send()
    }
})

// get all user
router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
        return User.countDocuments({})
    }).then((result) => {
        console.log(result)
    }).catch((e) => {
        res.status(500).send()
    })
})

const upload = multer({
    // For local storage uncomment this
    // dest:'./challenge_39/images',
    limits: {
        fileSize: 100000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|PNG|png|jpeg)$/)){
            return cb(new Error("File type wrong"))
        }
        cb(undefined,true)

    }
})

// Auth and storing data binary to db
router.post('/upload',auth,upload.single('file_upload'),(req,res)=>{
    req.user.dp = req.file.buffer
    req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send("error Upload a document")
})

// Get back user dp
router.get('/users/:id/dp', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.dp){
            res.status(404).send()
        }
        // Setting header
        res.set('Content-Type','image/jpg')
        res.send(user.dp)
    } catch(e){
        res.status(404).send()
    }
})

module.exports = router;