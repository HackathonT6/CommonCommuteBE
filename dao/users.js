const res = require("express/lib/response");
const User = require("../models/user");

const addUser = async (userCredentials) => {
	try {
		const userExists = await User.findOne({ email: userCredentials.email });
		if (userExists) return { error: true, message: "User already exists" };
		const user = await User.create(userCredentials);
		if (!user.email)
			return { error: true, message: "Could not write to MongoDB" };
		return user;
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "An error occured" });
		return;
	}
};

const getUser = async (email) => {
	try {
		const user = await User.findOne({ email: email });
		return user;
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "User does not exist", error: err });
	}
};

const getUserById = async (id) => {
	try {
		const user = await User.findOne({ _id: id });
		return user;
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "User does not exist", error: err });
	}
};

const updateUserPrefInDB = async (id, prefs) => {

	try {
		const user = await User.updateOne(
			{ _id: id },
			{
				$set: { preferences: prefs },
			}
		);
    console.log("!!!!HuRRAY pref updated in db!!!!")
		return user;
	} catch (error) {
		console.log("ERROR ON PREF UPDATE: ", err);
		res.status(500).json({ message: "Error updating prefs", error: err });
	}
};

module.exports = { addUser, getUser, getUserById, updateUserPrefInDB };
