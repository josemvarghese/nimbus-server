'use strict';
const passport = require('passport');
// const request = require('request');
const LocalStrategy = require('passport-local').Strategy;
const boom = require('boom');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: process.env.JWT_TOKEN_SECRET_KEY
};
const User = require('../models/user');
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { msg: `Email ${email} not found.` });
		}
		if(user.password){
			user.comparePassword(password, (err, isMatch) => {
				if (err) { return done(err); }
				if (isMatch) {
					return done(null, user);
				}
				return done(null, false, { msg: 'Unauthorized User.' });
			});
		}
		else{
			return done(null,false,{msg:'Please check your username or password' });

		}
	});
}));


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.status(401).json({ message: 'Unauthorized user' });
	}
};



passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	User.findById(jwt_payload.id, (err, existingUser) => {
		if (err) { return next(err); }
		if (!existingUser) {
			next(null, false);
		} else {
			next(null, existingUser);
		}
	});
}));

exports.jwtauth = function (req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (info) {
			next(boom.unauthorized(info));
		}
		if(user.status==0){
			next(boom.forbidden());
		}
		req.user = user;
		next();
	})(req, res, next);
};

exports.jwtOptions = jwtOptions;
