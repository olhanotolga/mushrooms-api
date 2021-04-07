const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MushroomSchema = new Schema({
	name: { type: String, required: true },
	commonName: { type: String, required: true },
	toxins: [{ type: String, required: true }],
	toxicity: { type: String, required: true }
}, {
	versionKey: false,
	timestamps: true
});

const Mushroom = model('Mushroom', MushroomSchema);

module.exports = Mushroom;