require('dotenv').config();
const mongoose = require('mongoose');
const Mushroom = require('../models/Mushroom');
const mushrooms = require('../mushroomData/mushrooms');

(async function() {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});

	mongoose.connection.on('error', () => console.log("☠️ DB connection failed"));
	mongoose.connection.on('open', () => console.log("★ Connected to DB successfully!"));

	try {
		await Mushroom.deleteMany({});
		console.log(`Mushrooms deleted!`);
	} catch (err) {
		console.log(err);
	}

	const mushroomPromises = mushrooms.map((mushroom) => {
		const mushroomData = {
			name: mushroom.name,
			commonName: mushroom.commonName,
			toxins: [...mushroom.toxins],
			toxicity: mushroom.toxicity
		};
		console.log(`${mushroomData.name} created!`);

		const fungus = new Mushroom(mushroomData);
		return fungus.save();
	})

	try {
		await Promise.all(mushroomPromises);
		console.log(`${mushrooms.length} mushrooms stored in the DB!`);
	} catch(err) {
		console.log(err);
	}

})()