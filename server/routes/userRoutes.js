// server/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, birthDate } = req.body;
        const newUser = new User({ name, email, phone, birthDate });
        await newUser.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: error });
    }
});

module.exports = router;
