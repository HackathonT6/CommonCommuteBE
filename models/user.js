const mongoose = require("mongoose");


const preferencesSchema = mongoose.Schema({
  _id : false ,
	Music: {type: Number,default: null},
	Movies: {type: Number,default: null},
	History: {type: Number,default: null},
	Politics: {type: Number,default: null},
	PC: {type: Number,default: null},
	Foreign_languages: {type: Number,default: null},
	Art_exhibitions: {type: Number,default: null},
	Religion: {type: Number,default: null},
	Countryside: {type: Number,default: null},
	outdoors: {type: Number,default: null},
	Dancing: {type: Number,default: null},
	Musical_instruments: {type: Number,default: null},
	Shopping: {type: Number,default: null},
	Science_and_technology: {type: Number,default: null},
	Theatre: {type: Number,default: null},
	Adrenaline_sports: {type: Number,default: null},
});

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match:
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
	},
	phonenumber: { type: String },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	password: { type: String, required: true },
	preferences: {type: preferencesSchema,default:null},

	//   savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
	//   fosteredPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
	//   adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
	role: { type: String, default: "ROLE.USER" },
});

module.exports = mongoose.model("User", userSchema);
