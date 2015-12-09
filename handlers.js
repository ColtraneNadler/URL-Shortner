function home(req, res) {
	res.sendFile(__dirname + '/index.html');
}

function error(req, res) {
	res.sendFile(__dirname + '/error.html');
}

function lookup(req, res) {
	var key = req.params['key'];

	global.redis.hget(global.URLS, key, (err, url) => {
		if(err)
			return console.log(err);

		if(!url)
			return res.sendFile(__dirname + '/error.html');

		return res.redirect(url);
	});
}

function shorten(req, res) {
	var body = req.body;

	if(!body.url)
		return res.json('no link')

	global.redis.hgetall(global.URLS, (err, urls) => {
		if(err)
			return console.log(err);

		for(o in urls) {
			if(urls[o] === body.url)
				return res.json(o);
		}

		var key = global.randomStr(5);

		global.redis.hset(global.URLS, key, body.url, (err) => {
			if(err)
				return console.log(err);

			res.json(key)
		})		
	})
}

module.exports = {
	lookup: lookup,

	create: shorten,

	error: error,

	home: home
}