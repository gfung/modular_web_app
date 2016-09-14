/**
 * Dependencies and Vars
 */


/**
 * All
 * Always run before everything else in this controller
 */
exports.always_login = (req, res,next) => {
	// console.log(req)
	console.log("we do stuff here before log in returning next()")
	return next();
};

/**
 * GET /
 * Get login page
 */
exports.get_login = (req, res,next) => {
	return res.render("../modules/login/views/login")
};

/**
 * POST /
 * Testing grounds for post
 */
exports.post_login = (req, res,next) => {
	console.log(req.body)
	return res.status(200).send("posted to login")
};