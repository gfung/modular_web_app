/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
// const lusca = require('lusca');
const dotenv = require('dotenv');
// const flash = require('express-flash');
const path = require('path');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const fs = require("fs");
const router = express.Router();
const homeController = require('./controllers/home');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
//dotenv.load({ path: '.env.example' });

/**
 * Create Express server.
 */
const app = express();

/** 
 *load controllers dynamically
 */
app.set('port', 3000); // set to another file later
app.set('env', "dev")
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// app.use(flash());
// app.use((req, res, next) => {
//     lusca.csrf()(req, res, next);
// });
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  // res.locals.user = req.user;
  next();
});
app.use(router);
//stuff
function if_err(the_error){
	if(the_error){console.log(the_error); return next(the_error)}
}

//path join public

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/** 
 *	import from modules folder
 */

fs.readdir(__dirname+'/modules', function(error, files){
	if_err(error)

	files.forEach(function (file){
		app.use("/"+file, require("./modules/"+file))
		// app.set('views', path.join(__dirname, 'views'), path.join(__dirname, "/modules/"+file+'/views') )
	})
})

/**
 * ROUTES
 */
app.route("/")
	//always run this first no matter the request type
	.all(homeController.always)
	//get requests
	.get(homeController.index)
	//post requests
	.post(homeController.test)

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;