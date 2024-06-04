require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const emaill = process.env.email;
const senha = process.env.senha;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servindo o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/send', async (req, res) => {
    const { name, email, celular, message } = req.body;
    
   
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: emaill, 
            pass: senha 
        }
    });
    
    let mailOptions = {
        from: emaill,
        to: emaill,
        subject: `Mensagem de ${name}, numero do cliente ${celular}, email ${email}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao enviar email');
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
