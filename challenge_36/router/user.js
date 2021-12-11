const express = require('express')
require('../mongoose')
const User = require('../model')
const auth = require('../middleware/user_middleware')
const router = new express.Router()

const app = express()

app.use(express.json())

// User profile 
router.get('/users/me', auth, async (req, res) => {
    return res.send(req.user)
})

// new user signup
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateToken(user._id)
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.matchCred(req.body.mobileNo, req.body.password)
        const token = await user.generateToken(user._id)
        return res.status(200).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        req.user.save()
        res.send("User logged out")
    } catch(e) {
        res.status(400).send()
    }

})

//Update user
router.patch('/users/:id', async (req, res) => {
    const changes = Object.keys(req.body) // Convert json fields to array 
    const allowedChanges = ['name', 'email', 'password']
    const isValidChange = changes.every((change) => {
        return allowedChanges.includes(change)
    })
    if (!isValidChange) {
        return res.status(400).send()
    }
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        changes.forEach((change) => {
            user[change] = req.body[change]
        })

        await user.save()
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(400).send()
    }
})

// get all user
router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
        return User.countDocuments({})
    }).then((result) => {
        console.log(result)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get user by id
router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


module.exports = router;