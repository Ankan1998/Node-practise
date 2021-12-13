const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task_model')

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
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]

})

// Hiding password and token
UserSchema.methods.toJSON = function(){
    const Obj = this.toObject()
    delete Obj.password
    delete Obj.tokens
    return Obj
}

//Json web token instance method
UserSchema.methods.generateToken = async function(id){
    const token = jwt.sign({_id:id.toString()},"ankan123")
    this.tokens.push({token:token})
    await this.save()
    return token
}

// Match credential static method(class method)
UserSchema.statics.matchCred = async function(mobNo,password){
    const user = await users.findOne({mobileNo:mobNo})
    if(!user){
        throw new Error("Login Error")
    }
    const isSame = await bcrypt.compare(password,user.password)
    if(!isSame){
        throw new Error("Login Error")
    }
    return user
    
}

// Virtual field creation
UserSchema.virtual('tasks_virtual',{
    ref:'Task',
    localField:'_id',
    foreignField:'creator'
})

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

UserSchema.pre('remove', async function(next){
    await Task.deleteMany({creator:this._id})
    next()
})

const users = mongoose.model('User', UserSchema)

module.exports = users