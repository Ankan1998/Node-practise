const express = require('express')
require('./mongoose')
const User = require('./model')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(req.body)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/users/:id',(req,res)=>{
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

app.get('/users/email/:email',(req,res)=>{
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

app.listen(port,()=>{
    console.log('Server listening on port: ' + port)
})