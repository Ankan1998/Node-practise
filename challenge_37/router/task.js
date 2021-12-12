const express = require('express')
require('../mongoose')
const Task = require('../model/task_model')
const auth = require('../middleware/user_middleware')
const router = new express.Router()

// Create a task
router.post('/tasks/create', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        creator: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// Read a task
router.get('/tasks', auth, async (req, res) => {
    try {
        const task_list = await Task.find({
            creator: req.user._id
        })
        res.status(200).send(task_list)

    } catch (e) {
        res.status(400).send()
    }
})

// Delete a task
router.delete('/tasks/delete/:id', auth,async (req, res) => {
    try {
        const task_list = await Task.find({
            creator: req.user._id
        })
        var task = {}
        task_list.every((t)=>{
            if(t._id.toString()===req.params.id){
                task = t
                return false
            } else {
                return true
            }
        })
        if (Object.keys(task).length===0) {
            return res.status(404).send("Task not Found")
        }

        await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Delete all Task
router.delete('/tasks/deleteAll', auth, async (req, res) => {
    try {
        await Task.deleteMany({creator:req.user._id})
        res.status(200).send()

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router