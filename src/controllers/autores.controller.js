const Autor = require('../models/autor.model');

const getAll = async (req, res, next) => {
  try {
    const autores = await Autor.getAll();
    res.json(autores);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { autorId } = req.params;
  try {
    const [autor] = await Autor.getById(autorId);
    if (!autor) {
      return res.status(404).json({ message: 'El autor no existe' });
    }
    res.json(autor);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ message: 'Los campos nombre y email son obligatorios' });
  }
  try {
    const result = await Autor.create(req.body);
    const [autor] = await Autor.getById(result.insertId);
    res.status(201).json(autor);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create };