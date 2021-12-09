const express = require('express');
const {spawn} = require('child_process');
const app = express();


app.get("/python",(req,res)=>{
    const py = spawn('python', ['./challenge_33/pydata.py',]);
    py.stdout.on('data',function(data){
        console.log(data.toString())
        res.send(data)
    })
       
})  

  

app.get("/",(req,res)=>{
    res.send('<h1>Welcome</h1>');
    
})

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})