const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()

app.use(bodyParser.urlencoded({urlencoded: true}))

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    res.send("Successfully registered on newsletter")
})

app.listen(80, function () {
    console.log("Server is running on port 80.");
})
