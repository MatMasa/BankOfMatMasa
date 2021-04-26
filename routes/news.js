const express = require('express'),
    newsController = require('../controllers/newsController'),
    sessionController = require('../controllers/sessionController'),
    router = express.Router();

/* GET REQUESTS */
router.get('/management', newsController.getNewsManagement);
router.get('/:id',sessionController.checkAuthentication, newsController.fetchById);

/* POST REQUESTS */
router.post('/new', newsController.create);



router.delete('/:id/delete', newsController.delete);

module.exports = router;
 