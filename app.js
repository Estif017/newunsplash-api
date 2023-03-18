const express = require('express');
const app = express();
const { getData, search } = require('./index');

app.use(express.json());

const favorites = {
	collections: [
		{
			id: '1',
			type: 'collection',
			title: 'dog',
		},
		{
			id: '2',
			type: 'collection',
			title: 'cats',
		},
		{
			id: '2',
			type: 'collection',
			title: 'cars',
		},
	],
	photos: [
		{
			id: '1',
			type: 'photos',
			title: 'dog',
		},
		{
			id: '2',
			type: 'photos',
			title: 'cats',
		},
		{
			id: '2',
			type: 'photos',
			title: 'cars',
		},
	],
};

app.get('/photos', async (req, res) => {
	let data;
	const { search: query } = req.query;
	if (query) {
		data = await search('photos', query);
	} else {
		data = await getData('photos');
	}
	res.send(data);
});

app.get('/collections', async (req, res) => {
	const { search: query } = req.query;
	let data;
	if (query) {
		data = await search('collections', query);
	} else {
		data = await getData('collections');
	}
	res.send(data);
});

app.get('/favorites/', (req, res) => {
	const { type } = req.query;
	res.send(favorites[type]);
});

app.post('/favorites/', (req, res) => {
	const { type } = req.body;
	console.log(req.body);
	favorites[type].push(req.body);
	res.send(favorites[type]);
});

app.listen(3000, () => {
	console.log(`Example app listening on port 3000`);
});
