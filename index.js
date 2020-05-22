require('dotenv').config()
const express = require('express')
const cors = require('cors')
const twilio = require('twilio')

const port = process.env.PORT
const twilioSid = process.env.TWILIO_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER

const app = express()

const twilioClient = twilio(twilioSid, twilioAuthToken)

const sendMessage = data => {
    if (!data.to || !data.body)
        return
    twilioClient.messages
        .create({
            from: `whatsapp:${twilioNumber}`,
            to: `whatsapp:+91${data.to}`,
            body: data.body
        }).then(message => {
            console.log(message.sid)
        }).catch(err => console.log(err))
}

app.use(cors())
app.use(express.json())

app.post('/notify', (req, res) => {
    console.log(req.body)
    const { user_name, user_school, user_grade, user_mobile_no, user_whatsapp_no, user_email } = req.body
    sendMessage({
        to: '9530077351',
        // to: '8696932715',
        // to: '8696932786',
        body: `
        Name: ${user_name}\n
        School Name: ${user_school}\n
        Grade/Percentage: ${user_grade}\n
        Mobile Number: ${user_mobile_no}\n
        Whatsapp Number: ${user_whatsapp_no}\n
        Email: ${user_email}\n
        This message was generated from BOT.
        `
    })
    res.json({ message: 'Done' })
})

app.listen(port, () => console.log(`Server Started on Port ${port}...`))