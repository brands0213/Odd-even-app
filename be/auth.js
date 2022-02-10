const jwt = require('jsonwebtoken');
const secret = "GirlfriendKoCrushKo";

module.exports.createAccessToken =(user) => {
	// Data will be received from the registration from
	// When the users log in, a token will be created with the user's infromation
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	//generate the token using the form data ad the secret code with no additional options provided
	return jwt.sign(data, secret, {})
}

// Token verification 
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		console.log(token);

		token = token.slice(7, token.length);

	// Validate the token using the "verify" method
	return jwt.verify(token, secret, (err, data) => {
		// if JWT is not valid
		if (err){
			return res.send({auth: "failed"});
		}
		else{
			// Allows the application to proceed with the next middleware fuction/callback function in the route
			next()
		}
	})

	}
	// Token does not exist
	else{
		return res.send({auth: "failed"})
	}
}

// Token decryption

module.exports.decode = (token) => {
	// Token recieved and is not undefined 
	if (typeof token !== "undefined"){
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) =>{
			if(err){
				return null
			}
			else{
				// "Decode" method is used to obtain the information from the JWT
				// "{Complete: true}" option allows to return additional information from the JWT
				// Returns an object with access to the "payload" property which contains user information stored when the token was generated.
				return jwt.decode(token, {complete: true}).payload
			}
		})
	}
	else{
		return null;
	}
}