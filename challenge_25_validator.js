const mongoose = require('mongoose')
const validator = require('validator')
const connectionURL = 'mongodb://127.0.0.1:27017/task-app-mongoose'

mongoose.connect(connectionURL)

const users = mongoose.model('User', {
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Email invalid')
            }
        }
    },
    mobileNo:{
        type:String,
        validate(val){
            if(!validator.isMobilePhone(val,['en-IN'])){
                throw new Error('Mobile Number Invalid')
            }
        }
    }
})

const first = new users({
    name: "Vegeta",
    email: "Vegata@goku.com",
    mobileNo:"9871234441"
})

first.save().then(() => {
    console.log(first)
}).catch((e) => {
    console.log("Error", e)
})