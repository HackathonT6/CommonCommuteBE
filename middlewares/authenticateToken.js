const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("!!!!token: ", token);
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenInfo) => {
		if (err) {
			console.log("error in auth: ", err);
			res.status(403).send("invalid token");
			return;
		} else {
			console.log("user id ", tokenInfo.userId);
			req.body.userId = tokenInfo.userId;
			req.body.userRole = tokenInfo.userRole;
			next();
		}
	});
};
