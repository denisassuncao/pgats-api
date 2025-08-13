const express = require('express');
const router = express.Router();
const { transfer } = require('../service/transferService');

router.post('/', (req, res) => {
  const { from, to, value } = req.body;
  if (!from || !to || typeof value !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, value' });
  }
  const result = transfer(from, to, value);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ message: 'Transferência realizada com sucesso' });
});

module.exports = router;
