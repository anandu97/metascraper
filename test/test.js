const controller = require('../controllers/controller');
const joi = require('@hapi/joi');

describe('testing main route', () => {
	it('should return title,images and sescribtion of the website', function (done) {
		const expectedRes = {
			description:
				'With Twilio, unite communications and strengthen customer relationships across your business – from marketing and sales to customer service and operations.',
			title:
				'Twilio - Communication APIs for SMS, Voice, Video and Authentication',
			images: [
				'https://www.twilio.com/marketing/bundles/company-brand/img/logos/red/twilio-logo-red.png',
			],
		};

		controller({ url: 'https://www.twilio.com/', timeout: 10000 })
			.then((data) => {
				const schema = joi
					.object({
						description: joi.string().required(),
						title: joi.string().required(),
						images: joi.array().items(joi.string()).required(),
					})
					.options({
						stripUnknown: true,
					});
				const result = schema.validate(data);

				if (result.error) {
					done(result.error);
				} else {
					done();
				}
			})
			.catch(done);
	});
});
