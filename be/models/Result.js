const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
	result : {
		type : String,
		required : [true, "Result is required"]
	},
	createdOn : {
		type : Date,
		default : new Date()
	},
	bets : [
		{
			userId : {
				type : String,
				required: [true, "UserId is required"]
			},
			betOn : {
				type : Date,
				default : new Date() 
			}
		}
	]
})

module.exports = mongoose.model("Result", resultSchema);