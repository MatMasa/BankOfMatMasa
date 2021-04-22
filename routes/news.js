const express = require('express'),
    newsController = require('../controllers/newsController'),
    router = express.Router();

router.post('/new', newsController.create);
router.get('/:id', newsController.fetchById);


module.exports = router;
