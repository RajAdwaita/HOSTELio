const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const Razorpay = require('razorpay')

dotenv.config()
const app = express()

// instance for initiating an order through razorpay
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

// middleware
app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.set("view engine", "ejs")

// routes
app.get("/payments", (req, res) => {
    // renders the payment template (payment.ejs)
    res.render("payment", {
        key: process.env.KEY_ID
    })
})

app.post("/api/payment/order", (req, res) => {
    // parsing the received request
    params = req.body

    // instantiating the order & receiving the order_id from razorpay server
    instance.orders
        .create(params) // promise
        .then((data) => {
            res.send({
                sub: data,
                status: 'success'
            })
        })
        .catch((error) => {
            res.send({
                sub: error,
                status: 'failed'
            })
        })
})

// after successfully sending the order id to razorpay server,
// razorpay sends back razorpay_order_id, razorpay_key, razorpay_signatures

// verifies the signature and sends a response whether the signature was successfully verified or not
app.post("/api/payment/verify", (req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id

    // encrypting the Secret Key to generate signature
    var expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(body.toString())
        .digest("hex")

    console.log("sig" + req.body.razorpay_signature)
    console.log("sig" + expectedSignature)

    var response = {
        status: "failure"
    }

    if (expectedSignature === req.body.razorpay_signature){
        response = {
            status: "success"
        }
    }

    res.send(response)
})


app.listen("3000", () => {
    console.log("Server running on port 3000")
})
