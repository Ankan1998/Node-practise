const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
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
        unique:true,
        validate(val){
            if(!validator.isMobilePhone(val,['en-IN'])){
                throw new Error('Mobile Number Invalid')
            }
        }
    },
    password:{
        type: String
    }

})



UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const users = mongoose.model('User', UserSchema)

module.exports = users