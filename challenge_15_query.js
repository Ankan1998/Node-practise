const express = require('express');
const path = require('path');
const app = express();


app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:"Error Address not filled"
        })
    }
    if(req.query.address == "phil") {
        return res.send({
            temp:"Raining heavily"
        })
    }
    res.send({
        current_temp: "65",
        apparent_temp: "61"
    })

})

app.get("/", (req, res) => {
    res.send("Welcome to Homepage")

})


app.listen(5000, () => {
    console.log("Server up and running at 5000")
})