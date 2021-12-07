const express = require('express')
require('./mongoose')
const User = require('./model')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.patch('/users/:id', async (req, res) => {
    const changes = Object.keys(req.body) // Convert json fields to array 
    const allowedChanges = ['name','email']
    const isValidChange = changes.every((change)=>{
        return allowedChanges.includes(change)
    })
    if(!isValidChange){
        return res.status(400).send()
    }
    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(
            _id,
            req.body, {
                new: true,
                runValidators: true
            }
        )
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch(e) {
        res.status(400).send()
    }
})

app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch(e) {
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})