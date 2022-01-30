const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_AUTH_TOKEN;
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
            app.get('/', (req, res) => {
                res.render('LANDING PAGE\src\app\admin\dashboard\dashboard.component.html')
            })
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