const jwt = require("jsonwebtoken")
const User = require("../model")

const auth = async function(req,res,next){
    try {
        const token = (req.headers.authorization).split(' ')[1]
        const decoded_token = jwt.verify(token,'ankan123')
        const user = await User.findOne({_id:decoded_token._id,"tokens.token":token})
        if (!user){
            throw new Error()
        } 
        req.user = user
        req.token = token
        next()
    } catch(e){
        res.status(400).send("PLease Authenticate")
    }
}

module.exports = auth