const Result = require("../models/Result");

module.exports.getResult = () => {

	return Result.find({}).then(result => {

		return result;

	});

};