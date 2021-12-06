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

app.listen(port,()=>{
    console.log('Server listening on port: ' + port)
})