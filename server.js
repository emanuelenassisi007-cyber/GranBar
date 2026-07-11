const express = require("express");
const cors = require("cors");
const path = require("path");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/contact", async (req, res) => {
  console.log("Richiesta ricevuta:", req.body);

  const { nome, email, messaggio } = req.body;

  if (!nome || !email || !messaggio) {
    return res.status(400).json({
      errore: "Tutti i campi sono obbligatori!",
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "GranBar <onboarding@resend.dev>",
      to: ["emanuele.nassisi007@gmail.com"],
      replyTo: email,
      subject: `Nuovo messaggio da ${nome}`,
      text: `
Hai ricevuto un nuovo messaggio dal sito.

Nome: ${nome}
Email cliente: ${email}

Messaggio:
${messaggio}
      `,
    });

    if (error) {
      console.error("Errore Resend:", error);

      return res.status(500).json({
        errore: "Impossibile inviare il messaggio.",
      });
    }

    console.log("Email inviata:", data);

    return res.status(200).json({
      success: true,
    });
  } catch (errore) {
    console.error("Errore durante l'invio:", errore);

    return res.status(500).json({
      errore: "Impossibile inviare il messaggio, riprova più tardi.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server backend attivo sulla porta ${PORT}`);
});
