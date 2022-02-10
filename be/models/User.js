const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  email : {
    type : String,
    required : [true, "Email is required"]
  },
  password : {
    type : String,
    required : [true, "Password is required"]
  },
  isAdmin : {
    type : Boolean,
    default : false
  },
  betHistory : [
    {
       betOn: {
        type : String,
        required : [true, "Product ID is required"]
      },
      betDate : {
        type : Date,
        default : new Date()
      },
      status : {
        type : String,
        default : "Won"
      }
    }
  ]
})

module.exports = mongoose.model("User", userSchema);