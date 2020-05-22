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
    sendMessage({
        to: '9530077351',
        // to: '8696932715',
        // to: '8696932786',
        body: 'Hello friends, chai peelo'
    })
    res.json({ message: 'Done' })
})

app.listen(port, () => console.log(`Server Started on Port ${port}...`))