const axios = require('axios');
require('dotenv').config();

const constructUrl = (type, search = '') => {
	const base = `https://api.unsplash.com`;
	const id = `client_id=${process.env.ACCESS_KEY}`;
	return `${base}/${search && `search/`}${type}/?${id}`;
};

module.exports.getData = async (type) => {
	try {
		const { data } = await axios.get(`${constructUrl(type)}&order_by=latest`);
		return data;
	} catch (error) {
		console.log(error.message, error.status);
	}
};

module.exports.search = async (type, query) => {
	try {
		const { data } = await axios.get(
			`${constructUrl(type, 'search')}&query=${query}`
		);
		return data;
	} catch (error) {
		console.log(error.message, error.status);
	}
};

//todo list
//eroor handling
//500
//404
//
