const express = require('express');
const controller = require('../controllers/controller');
const validate = require('../validations/validator.js');
const cache = require('../configs/cache.js');

const router = express.Router();

router.post('/', validate, cache(10000), async (req, res) => {
	const requestOpts = { url: req.xop.url, timeout: 10000 };
	let response = await controller(requestOpts);
	res.json(response);
});

module.exports = router;
