const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
	addUser,
	getUser,
	getUserById,
	updateUserPrefInDB,
	getTopMachesFromDB,
	getAllUsersId,
} = require("../dao/users");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signUpController = async (req, res) => {
	const { email, password, firstname, lastname, phonenumber } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const userCredentials = {
			_id: new mongoose.Types.ObjectId(),
			email,
			password: hashedPassword,
			firstname,
			lastname,
			phonenumber,
		};
		const user = await addUser(userCredentials);
		if (user.error) throw user;
		const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
			expiresIn: "1h",
		});
		const userData = {
			_id: user._id,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			phonenumber: user.phonenumber,
			role: user.role,
		};
		return res.status(201).json({
			message: "Sign-up successful",
			token: token,
			userData: userData,
		});
	} catch (err) {
		res.status(500).json({ message: "A serious error occurred", error: err });
		return;
	}
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUser(email);
		if (!user) return res.status(500).json({ message: "User does not exist" });
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch)
			return res.status(401).json({ message: "Password incorrect" });
		const token = jwt.sign(
			{ userId: user._id, userRole: user.role },
			JWT_SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);
		const userData = {
			_id: user._id,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			phonenumber: user.phonenumber,
			role: user.role,
		};
		return res
			.status(200)
			.json({ message: "Login successful", token: token, userData: userData });
	} catch (err) {
		res.status(500).json({ message: "A serious error occured", error: err });
		return;
	}
};

const getUserByIdController = async (req, res) => {
	const id = req.body.userId;
	try {
		const user = await getUserById(id);
		if (!user) return res.status(500).json({ message: "User does not exist" });

		return res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: "A serious error occured", error: err });
		return;
	}
};

const updatePref = async (req, res) => {
	const id = req.body.userId;
	const prefs = req.body.preferences;

	console.log(prefs);
	try {
		const user = await updateUserPrefInDB(id, prefs);
		if (!user) return res.status(500).json({ message: "User does not exist" });
		return res.status(200).json(user);
	} catch (err) {
		res
			.status(500)
			.json({ message: "A serious error occured in UPDATE PREF", error: err });
		return;
	}
};

const getUserPrefs = async (req, res) => {
	const id = req.body.userId;

	try {
		const user = await getUserById(id);

		if (!user) return res.status(500).json({ message: "User does not exist" });
		return res.status(200).json(user.preferences);
	} catch (err) {
		res
			.status(500)
			.json({ message: "A serious error occured in GET PREF", error: err });
		return;
	}
};

const getTopMatches = async (req, res) => {
	const id = req.body.userId;
  

	try {
		const { fakeId } = await getUserById(id);
		const topMatches = await getTopMachesFromDB(fakeId);
		// const realIds = await getRealIds(topMatches);
		const realIds = await getAllUsersId();
		const idsAndScores = realIds.map((id, i) => {
			return { score: topMatches[i].match_score, _id: id._id };
		});
		return res.status(200).json(idsAndScores);
	} catch (err) {
		res
			.status(500)
			.json({ message: "A serious error occured in GET Match", error: err });
		return;
	}
};

async function getRealIds(fakeIds) {
	try {
		const realIds = await fakeIds.map(async (fake) => {
			return await getUserById(fake.user_2);
		});

		return realIds;
	} catch (err) {
		res
			.status(500)
			.json({ message: "A serious error occured in GET Match", error: err });
		return;
	}
}

module.exports = {
	signUpController,
	loginController,
	getUserByIdController,
	updatePref,
	getUserPrefs,
	getTopMatches,
};
