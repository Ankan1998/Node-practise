const express = require('express')
require('../mongoose')
const User = require('../model')
const router = new express.Router()

const app = express()

app.use(express.json())

router.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(req.body)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
        return User.countDocuments({})
    }).then((result)=>{
        console.log(result)
    }).catch((e)=>{
        res.status(500).send()
    })
})

router.get('/users/:id',(req,res)=>{
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

module.exports = router;
