const transfers = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer(from, to, value) {
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) return { error: 'Usuário não a encontrado' };
  if (from === to) return { error: 'Não é possível transferir para si mesmo' };
  if (!sender.favorites?.includes(to) && value >= 5000) {
    return { error: 'Transferência acima de R$ 5.000,00 só para favorecidos' };
  }
  transfers.push({ from, to, value, date: new Date() });
  return { success: true };
}

module.exports = { transfer };
