const express = require('express'),
  userController = require('../controllers/userController'),
  sessionController = require('../controllers/sessionController'),
  router = express.Router();



// GET requests:
router.get('/', sessionController.getLogin);
router.get('/dashboard', sessionController.getDashboard);
router.get('/test', userController.generateData);
router.get('/logout', sessionController.logout);

// POST requests:
router.post('/login', sessionController.login);




module.exports = router;