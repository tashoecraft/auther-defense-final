'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('../api/users/user.model');
var crypto = require('crypto');

router.post('/login', function(req, res, next) {
	User.findOne(req.body).exec()
		.then(function(user) {
			if (!user) throw HttpError(401);
			req.login(user, function() {
				res.json(user);
			});
		})
		.then(null, next);
});

router.post('/signup', function(req, res, next) {
	crypto.pbkdf2Sync(req.body.password, 'salt', 4096, 512, 'sha256',
		function(err, key) {
			if (err) throw err;
			console.log(key.toString('hex'));
			req.body.password = key.toString('hex');
			req.body.salt = salt;
		});
	User.create(req.body)
		.then(function(user) {
			req.login(user, function() {
				res.status(201).json(user);
			});
		})
		.then(null, next);
});

router.get('/me', function(req, res, next) {
	res.json(req.user);
});

router.delete('/me', function(req, res, next) {
	req.logout();
	res.status(204).end();
});

router.use('/google', require('./google.oauth'));

router.use('/twitter', require('./twitter.oauth'));

router.use('/github', require('./github.oauth'));

module.exports = router;
