const getAll = async (req, res, next) => {
  res.json('Recupera todos los posts');
};

const getById = async (req, res, next) => {
  const { postId } = req.params;
  res.json(`Recupera el post ${postId}`);
};

const getByAutor = async (req, res, next) => {
  const { autorId } = req.params;
  res.json(`Recupera los posts del autor ${autorId}`);
};

const create = async (req, res, next) => {
  res.json(req.body);
};

module.exports = { getAll, getById, getByAutor, create };