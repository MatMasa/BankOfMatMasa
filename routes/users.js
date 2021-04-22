var express = require('express');
const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController')
var router = express.Router();
const methodOverride = require('method-override');



router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

// GET requests
router.get('/management', sessionController.checkAuthentication, userController.fetchAll);
router.get('/register', userController.getRegister);
router.get('/:id/edit', sessionController.checkAuthentication, userController.edit);
router.get('/:id', sessionController.checkAuthentication, userController.fetchById)
// POST requests
router.post('/register', userController.register)

// DELETE/PUT requests
router.delete('/:id/delete', userController.delete);
router.put('/:id/update', userController.update)

module.exports = router;