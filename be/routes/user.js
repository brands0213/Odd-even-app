const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const auth = require("../auth");


router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user authentication
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for retrieving user details
// The "auth.verity" acts as a middleware to ensure that the user is logged in before they can play
router.get("/details", auth.verify, (req, res) => {

	// Uses the "decode" method defined in the "auth.js" file to retrieve the user information from the token passing the "token" from the request header as an argument
	const userData = auth.decode(req.headers.authorization);

	// Provides the user's ID for the getProfile controller method
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));

});


// Allows us to export the "router" object that will be accessed in our "index.js" file
module.exports = router;