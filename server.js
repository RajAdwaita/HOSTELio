const express = require('express');
//const
const app = express();
const PORT = 3000;

const accountSid = "ACd60c2e9baf81595c54f6927d136acbfc";
const authToken = "8fc1392f51558116e4b9b922c1a1bd3c";
const serviceId = "VA54cd1786fce17810a7ef73d635d80d1a";
const client = require('twilio')(accountSid, authToken);


app.use(express.static('public'));
app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post(`/send-verification-otp`, (req, res) => {

    const { mobileNumber } = req.body;





    client.verify.services(serviceId)
        .verifications
        .create({ to: '+91' + mobileNumber, channel: 'sms' })
        .then((verification) => {
            res.status(200).json({ verification });
        })
        .catch(error => {
            res.status(400).json({ error });

        })
});

app.post('/verify-otp', (req, res) => {
    const { mobileNumber, otp } = req.body;
});


app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
})