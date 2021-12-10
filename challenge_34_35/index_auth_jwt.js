const express = require('express')
const UserRouter = require('./router/user')

const app = express()
const port = process.env.PORT || 3000

// Middleware added to show server down
app.use((req,res,next)=>{
    res.status(503).send("Server under Maintenance")
})

app.use(express.json())
app.use(UserRouter)

app.listen(port,()=>{
    console.log('Server listening on port: ' + port)
})