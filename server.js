const routes = require('./routes/routes.js');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
Route accepts a url as json object
{
    "url":""
}
*/
app.use('/', routes);

// app.post('/', cache(10), async (req, res) => {
// 	const schema = joi
// 		.object({
// 			url: joi.string(),
// 		})
// 		.options({
// 			stripUnknown: true,
// 		});
// 	const result = schema.validate(req.body);
// 	if (result.error) {
// 		callback(null, { message: result.error.details[0].message });
// 	}
// 	const requestOpts = { url: result.value.url, timeout: 10000 };
// 	let response = await controller(requestOpts);
// 	res.json(response);
// });

app.listen(port, () => {
	console.log(`app listening at ${port}`);
});
