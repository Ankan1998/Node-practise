const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = users