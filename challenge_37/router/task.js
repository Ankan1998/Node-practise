const express = require('express')
require('../mongoose')
const Task = require('../model/task_model')
const auth = require('../middleware/user_middleware')
const router = new express.Router()

router.post('/tasks',auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        creator:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send()
    }
})


module.exports = router
