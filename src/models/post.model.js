const db = require('../config/db');

// Query base: posts unidos con su autor (se reutiliza en varias funciones)
const SELECT_POSTS = `
  SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
         a.id AS autor_id, a.nombre AS autor_nombre,
         a.email AS autor_email, a.imagen AS autor_imagen
  FROM posts p
  INNER JOIN autores a ON p.autor_id = a.id
`;

// Convierte una fila plana del JOIN en un post con el autor anidado
const formatPost = (row) => ({
  id: row.id,
  titulo: row.titulo,
  descripcion: row.descripcion,
  fecha_creacion: row.fecha_creacion,
  categoria: row.categoria,
  autor: {
    id: row.autor_id,
    nombre: row.autor_nombre,
    email: row.autor_email,
    imagen: row.autor_imagen,
  },
});

const getAll = async () => {
  const [result] = await db.query(SELECT_POSTS);
  return result.map(formatPost);
};

const getById = async (postId) => {
  const [result] = await db.query(`${SELECT_POSTS} WHERE p.id = ?`, [postId]);
  return result.map(formatPost);
};

const getByAutorId = async (autorId) => {
  const [result] = await db.query(`${SELECT_POSTS} WHERE p.autor_id = ?`, [autorId]);
  return result.map(formatPost);
};

const create = async ({ titulo, descripcion, categoria, autor_id }) => {
  const [result] = await db.query(
    'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
    [titulo, descripcion, categoria, autor_id]
  );
  return result;
};

module.exports = { getAll, getById,getByAutorId, create };