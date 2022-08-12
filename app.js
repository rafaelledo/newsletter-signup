const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()

app.use(bodyParser.urlencoded({urlencoded: true}))

app.listen(80, function () {
    console.log("Server is running on port 80.");
})
