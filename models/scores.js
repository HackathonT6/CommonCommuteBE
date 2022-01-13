const mongoose = require("mongoose");



const scoreSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_1: { type: String },
		user_2: { type: String },
              match_score: {type:Number}
	},
	{ collection: "scores" }
);

module.exports = mongoose.model("Score", scoreSchema);
