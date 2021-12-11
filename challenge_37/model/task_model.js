const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required:true,
    },
    completed:{
        type: Boolean
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }

})

const tasks = mongoose.model('Task', TaskSchema)

module.exports = tasks