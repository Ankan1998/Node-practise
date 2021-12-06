const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-app-mongoose'

mongoose.connect(connectionURL)

const tasks = mongoose.model('Tasks',{
    task:{
        type: String
    },
    completed: {
        type: Boolean
    }
})

const first = new tasks({
    task: "Meet Zelda at 6",
    completed:false
})

first.save().then(()=>{
    console.log(first)
}).catch((e)=>{
    console.log("Error", e)
})