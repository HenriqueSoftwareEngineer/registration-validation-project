// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB (removendo opções obsoletas)
mongoose.connect('mongodb://localhost:27017/cadastro', {});

mongoose.connection.once('open', () => {
    console.log('Conectado ao MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
