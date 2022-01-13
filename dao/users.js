const res = require("express/lib/response");
const User = require("../models/user");
const Score = require("../models/scores");
const mongoose = require("mongoose");
const req = require("express/lib/request");

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
    console.log("!!!!HuRRAY pref updated in db!!!!");
    return user;
  } catch (error) {
    console.log("ERROR ON PREF UPDATE: ", err);
    res.status(500).json({ message: "Error updating prefs", error: err });
  }
};

const getTopMachesFromDB = async (id) => {
	try {
		const fiveUsersFakeId = await Score.find({user_1: id},{user_2:1,match_score:1, _id:0}).sort({ match_score: -1}).limit(5);
		console.log("!!!!HuRRAY found 5 in db!!!! ", fiveUsersFakeId);
		return fiveUsersFakeId;
	} catch (error) {
		console.log("ERROR ON PREF UPDATE: ", err);
		res.status(500).json({ message: "Error updating prefs", error: err });
	}
};

const getAllUsersId = async () => {
  try {
    const usersIds = await User.find({}, { _id: 1 }).limit(5);

    return usersIds;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User does not exist", error: err });
  }
};

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUserPrefInDB,
  getTopMachesFromDB,
  getAllUsersId,
};
