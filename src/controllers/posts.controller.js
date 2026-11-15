const Post = require('../models/post.model');
const Autor = require('../models/autor.model');

const getAll = async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const [post] = await Post.getById(postId);
    if (!post) {
      return res.status(404).json({ message: 'El post no existe' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const getByAutor = async (req, res, next) => {
  const { autorId } = req.params;
  res.json(`Recupera los posts del autor ${autorId}`);
};

const create = async (req, res, next) => {
  const { titulo, descripcion, categoria, autor_id } = req.body;
  if (!titulo || !descripcion || !categoria || !autor_id) {
    return res.status(400).json({ message: 'Los campos titulo, descripcion, categoria y autor_id son obligatorios' });
  }
  try {
    const [autor] = await Autor.getById(autor_id);
    if (!autor) {
      return res.status(400).json({ message: 'El autor indicado no existe' });
    }
    const result = await Post.create(req.body);
    const [post] = await Post.getById(result.insertId);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, getByAutor, create };