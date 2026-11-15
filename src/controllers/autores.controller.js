const getAll = async (req, res, next) => {
  res.json('Recupera todos los autores');
};

const getById = async (req, res, next) => {
  const { autorId } = req.params;
  res.json(`Recupera el autor ${autorId}`);
};

const create = async (req, res, next) => {
  res.json(req.body);
};

module.exports = { getAll, getById, create };