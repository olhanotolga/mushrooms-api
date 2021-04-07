require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Mushroom = require('./models/Mushroom');

// const poisonousMushrooms = require('./mushroomData/poisonous');
// const deadlyMushrooms = require('./mushroomData/deadly');


const app = express();

app.use(express.json());


//* ROUTES

const homepageMsg = `<h1>🍄 API</h1>
<p>This is where my mushroom API will live.</p>
<p>For now, I have the following routes available:</p>
<ul>
	<li>/mushrooms/poisonous</li>
	<li>/mushrooms/deadly</li>
</ul>`;

app.get('/', (req, res) => res.send(homepageMsg));

app.get('/mushrooms/poisonous', async (req, res) => {
	try {
		const poisonousMushrooms = await Mushroom.find({ toxicity: 'poisonous' })
		res.json(poisonousMushrooms);
	} catch (err) {
		console.log(err);
	}
});

app.get('/mushrooms/deadly', async (req, res) => {
	try {
		const deadlyMushrooms = await Mushroom.find({ toxicity: 'poisonous' })
		res.json(deadlyMushrooms);
	} catch (err) {
		console.log(err);
	}
});



//* MONGODB CONNECT

mongoose.connect(process.env.MONGO_URI, {
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useNewUrlParser: true
})
mongoose.connection.once('open', () => console.log(`⭐️ Connected to the DB!`));
mongoose.connection.on('error', () => console.log(`☠️ Connection error!`));



//* RUN THE APP

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🍄 API running on port ${PORT}`));