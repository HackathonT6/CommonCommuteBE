const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  modetransport: { type: String, required: true },
  interests: [{ type: String, required: true }],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Trip", tripSchema);
