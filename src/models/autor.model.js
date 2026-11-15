const db = require('../config/db');

const getAll = async () => {
  const [result] = await db.query('SELECT * FROM autores');
  return result;
};

const getById = async (autorId) => {
  const [result] = await db.query('SELECT * FROM autores WHERE id = ?', [autorId]);
  return result;
};

const create = async ({ nombre, email, imagen }) => {
  const [result] = await db.query(
    'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
    [nombre, email, imagen]
  );
  return result;
};

module.exports = { getAll, getById, create };