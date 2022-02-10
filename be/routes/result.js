const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result");


// Route for retrieving all the results
router.get("/result", (req, res) => { //need for middleware

	courseController.getResult().then(resultFromController => res.send(resultFromController));

});


module.exports = router;