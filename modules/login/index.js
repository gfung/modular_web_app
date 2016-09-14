const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login')

/**
 * ROUTES
 */
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  return next();
});

/**
 * Login ROUTES
 */

router.get('/', loginController.get_login)
//does this work
router.post('/', loginController.post_login)

module.exports = router;