const express = require('express')
const UserRouter = require('./router/user')
const UserEmailRouter = require('./router/user_email')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)
app.use(UserEmailRouter)

app.listen(port,()=>{
    console.log('Server listening on port: ' + port)
})