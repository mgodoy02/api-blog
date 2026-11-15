const router = require('express').Router();
const { getAll, getById, create } = require('../../controllers/autores.controller');
const { getByAutor } = require('../../controllers/posts.controller');

router.get('/', getAll);
router.get('/:autorId', getById);
router.get('/:autorId/posts', getByAutor);
router.post('/', create);

module.exports = router;