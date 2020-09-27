var mcache = require('memory-cache');

module.exports = function (duration) {
	return (req, res, next) => {
		let key = '__express__' + req.body.url;
		let cachedBody = mcache.get(key);
		if (cachedBody) {
			res.json(JSON.parse(cachedBody));
			return;
		} else {
			res.sendResponse = res.send;
			res.send = (body) => {
				mcache.put(key, body, duration * 1000);
				res.sendResponse(body);
			};
			next();
		}
	};
};
