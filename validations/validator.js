const joi = require('@hapi/joi');

module.exports = (req, res, next) => {
	const schema = joi
		.object({
			url: joi.string().required(),
		})
		.options({
			stripUnknown: true,
		});
	const result = schema.validate(req.body);

	if (result.error) {
		req.error = {
			msg: result.error.details[0].message,
		};
		next({});
	} else {
		req.xop = { ...result.value };
	}

	if (result.error) {
		callback(null, { message: result.error.details[0].message });
	}
	next();
};
