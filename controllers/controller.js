const cheerio = require('cheerio');
const request = require('request');
const { response } = require('express');
const extractTags = require('../configs/extractmeta');

module.exports = async function (requestOpts) {
	return new Promise((resolve, reject) => {
		request.get(requestOpts, function (err, response, body) {
			if (err || !response) {
				console.log(err);
				reject({ err: 'unreachable url' });
				return;
			}
			if (response.statusCode && response.statusCode !== 200) {
				reject({ err: 'unreachable url' });
				return;
			}
			if (response.statusCode && response.statusCode === 200) {
				const cher = cheerio.load(body);
				const tags = extractTags(cher);
				const response = inspectTags(parseResponse(tags), cher);
				resolve(response);
			}
		});
	});
};

function parseResponse(data) {
	let response = {};
	let images = [];
	for (var i in data) {
		switch (i) {
			case 'title':
				response.title = data[i];
				break;
			case 'og:title':
				if (!response.hasOwnProperty('title')) response.title = data[i];
				break;
			case 'description':
				response.description = data[i];
				break;
			case 'image':
				images.push(data[i]);
				break;
			case 'og:image':
				images.push(data[i]);
				break;
			default:
				break;
		}
	}
	if (images.length > 0) response.images = images;
	return response;
}

function inspectTags(tags, cher) {
	if (!tags.hasOwnProperty('description')) {
		tags.description = cher('p').text();
	}
	if (!tags.hasOwnProperty('title')) {
		tags.title = cher('title').text();
	}
	if (!tags.hasOwnProperty('images')) {
		console.log(cher('img').attr('src'));
		tags.images = [cher('img').attr('src')];
	}
	return tags;
}
