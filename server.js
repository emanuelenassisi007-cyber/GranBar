const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((errore, success) => {
  if (errore) {
    console.error("Errore connessione Gmail", errore);
  } else {
    console.log("Connessione Gmail riuscita");
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/api/contact", async (req, res) => {
  const { nome, email, messaggio } = req.body;

  if (!nome || !email || !messaggio) {
    return res.status(400).json({ errore: "Tutti i campi sono obbligatori!" });
  }

  const mail = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: "Nuovo messaggio",
    text: `Hai ricevuto un messaggio da ${nome}\nEmail cliente: ${email}\n\nMessaggio:\n${messaggio}`,
  };

  try {
    await transporter.sendMail(mail);
    res.status(200).json({ success: true });
  } catch (errore) {
    console.error("Errore nell'invio dell'email:", errore);
    res
      .status(500)
      .json({ errore: "Impossibile inviare il messaggio, riprova piu tardi" });
  }
});

app.listen(PORT, () => {
  console.log(`Server di backend attivo sulla porta ${PORT}`);
});
