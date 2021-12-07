const express = require('express')
require('../mongoose')
const User = require('../model')
const router = new express.Router()

const app = express()

app.use(express.json())

router.get('/users/email/:email',(req,res)=>{
    const email_id = req.params.email
    console.log(email_id)
    User.findOne({email: email_id}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

module.exports = router;