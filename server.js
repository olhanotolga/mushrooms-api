const express = require('express');

const poisonousMushrooms = require('./mushroomData/poisonous');
const deadlyMushrooms = require('./mushroomData/deadly');


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

app.get('/mushrooms/poisonous', (req, res) => {
	res.json(poisonousMushrooms);
});

app.get('/mushrooms/deadly', (req, res) => {
	res.json(deadlyMushrooms);
});



//* RUN THE APP

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🍄 API running on port ${PORT}`));