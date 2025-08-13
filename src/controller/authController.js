const express = require('express');
const router = express.Router();
const { login } = require('../service/authService');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }
  const user = login(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  res.json({ message: 'Login realizado com sucesso', user: { username: user.username, favorites: user.favorites } });
});

module.exports = router;
