// routes/contact.js (o como llames tu archivo de rutas)
import express from "express";
import nodemailer from "nodemailer";
import JoiValidation from "../Backend-Controled/JoiValidation.js";

const router = express.Router();

router.post("/SubmitData", JoiValidation, (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_NODER_MAILER,
      pass: process.env.PASSWORD_NODE_MAILER,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER_NODER_MAILER,
    subject: asunto,
    text: `Hello, my name is: ${nombre}. I want you to know that: ${mensaje}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        message: "Ha ocurrido un error al enviar el correo.",
        detail: error.toString(),
      });
    }
    console.log("Email sent:", info.response);
    return res.status(200).json({
      message: "Correo enviado correctamente.",
    });
  });
});

export default router;
