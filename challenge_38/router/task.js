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

//get creator details from task
router.get('/tasks/creator/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id:req.params.id,
            creator: req.user._id
        })
        if(!task){
            return res.status(400).send()
        }
        await task.populate('creator')
        res.status(200).send(task)


    } catch (e) {
        res.status(500).send()
    }
})


//Read task by id
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id:req.params.id,
            creator: req.user._id
        })
        if(!task){
            return res.status(400).send()
        }
        res.status(200).send(task)


    } catch (e) {
        res.status(500).send()
    }
})


// Read all task - using virtual get task
router.get('/tasks', auth, async (req, res) => {
    const filter = {}
    if(req.query.completed){
        filter.completed = req.query.completed==='true'
    }
    try {
        await req.user.populate({
            path: 'tasks_virtual',
            match:filter
        })
        res.status(200).send(req.user.tasks_virtual)

    } catch (e) {
        res.status(400).send()
    }
})

// Update task
router.patch('/tasks/update/:id', auth, async (req, res) => {
    const changes = Object.keys(req.body) // Convert json fields to array 
    const allowedChanges = ['task', 'completed']
    const isValidChange = changes.every((change) => {
        return allowedChanges.includes(change)
    })
    if (!isValidChange) {
        return res.status(400).send()
    }
    try {
        const task = await Task.findOne({_id:req.params.id,creator:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        changes.forEach((change) => {
            task[change] = req.body[change]
        })

        await task.save()
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }
})

// Delete a task
router.delete('/tasks/delete/:id', auth,async (req, res) => {
    try {
        // Noob's way of deleting
        // const task_list = await Task.find({
        //     creator: req.user._id
        // })
        // var task = {}
        // task_list.every((t)=>{
        //     if(t._id.toString()===req.params.id){
        //         task = t
        //         return false
        //     } else {
        //         return true
        //     }
        // })
        // if (Object.keys(task).length===0) {
        //     return res.status(404).send("Task not Found")
        // }

        // Not a Noob's way of deleting
        const delCount = await Task.deleteOne({_id:req.params.id,creator:req.user._id})
        if(delCount.deletedCount===0){
            return res.status(400).send()
        }
        res.status(200).send()
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