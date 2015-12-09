var key = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

global.URLS = 'urls:shortend';

/**
* @param num
* return String
*/
global.randomStr = (num) => {
	var str = '';

	for(var j = 0; j < num; j++) {
		str += key[Math.floor(Math.random() * (key.length - 1))];
	}

	return str;
}

// =============
//  Core Module
// =============
var express = require('express')
	, app = express()
	, bodyParser = require('body-parser')
	, morgan = require('morgan');

	global.redis = require('redis').createClient();


// =============
//  Middleware
// =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

var redirect = (req, res) => res.redirect('https://www.minehq.com');

var handlers = require('./handlers');
app.get('/', redirect);
// =============
//  Routes
// =============
app.get('/shorten', handlers.home);


// =============
//  Rest Routes
// =============
app.post('/shorten', handlers.create);
app.get('/:key', handlers.lookup);

app.get('*', redirect);


// =============
//  Listen
// =============
app.listen(3000, (err) => {
	if(err)
		return console.log(err);

	console.log('Running...')
})