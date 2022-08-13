const express = require("express")
const app = express()
app.use(express.static("public"))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({urlencoded: true}))

const request = require("request")
const https = require("https")
const { response } = require("express")

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/07a2a61c85"

    const options = {
        method: "POST",
        auth: "rgnh55:z1c90d3fa18cc936eaf54ee852dd6a34d-us17"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

    // res.send("Successfully registered on newsletter")
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(80, function () {
    console.log("Server is running on port 80.");
})

// 1c90d3fa18cc936eaf54ee852dd6a34d-us17 API Key

// 07a2a61c85 Audiencie ID