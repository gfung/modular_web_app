/**
 * Dependencies and Vars
 */
const https = require("https")

/**
 * All
 * Always run before everything else in this controller
 */
exports.always = (req, res,next) => {
	// console.log(req)
	console.log("we do stuff here like checking sessions before returning next()")
	if(!req){
		console.log("heya")
		return res.render('index', {
			title: 'Home'
  		});
	}

	return next();
};

/**
 * GET /
 * Home page.
 */
exports.index = (req, res,next) => {
  return res.render('home', {
    title: 'Home'
  });
};

/**
 * POST /
 * Testing grounds for post
 */
exports.test = (req, res,next) => {
	var options = {
	  hostname: 'encrypted.google.com',
	  port: 443,
	  path: '/',
	  method: 'GET'
	};

	var req = https.request(options, (res) => {
	  console.log('statusCode:', res.statusCode);
	  console.log('headers:', res.headers);

	  res.on('data', (d) => {
	    process.stdout.write(d);
	  });
	});
	req.end();

	req.on('error', (e) => {
	  console.error(e);
	});
};