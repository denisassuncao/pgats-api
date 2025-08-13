const express = require('express');
const router = express.Router();
const { addUser, getAllUsers } = require('../service/userService');

router.post('/', (req, res) => {
  const { username, password, favorites } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }
  const ok = addUser({ username, password, favorites: favorites || [] });
  if (!ok) {
    return res.status(409).json({ error: 'Usuário já existe' });
  }
  res.status(201).json({ message: 'Usuário criado com sucesso' });
});

router.get('/', (req, res) => {
  res.json(getAllUsers().map(u => ({ username: u.username, favorites: u.favorites })));
});

module.exports = router;
