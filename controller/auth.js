const boom = require('boom');
const helper = require('../utils/helper');
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
require('async');
require('await');

function signup(req,res,next) {
	createUser(req,res,next);
}
function signin(req,res,next) {
		userSignin(req,res,next);
}
function signout(req,res,next) {
	helper.removeRefreshToken(req.user._id);
	req.logout();
	res.json({ statusCode: 200, message: 'Signout successfull' });
}
async function createUser(req,res,next) {
	try {
		let checkUserExist = await  userExistCheck(req.body.email);
		if(checkUserExist!=null){
			return next(boom.badRequest('User already exists'));
		}
		else{
			newUser(req,res,next);
		}
	}
	catch (err) {
		return next(boom.internal(err));
	}
}
function userExistCheck(email) {
	return User.findOne({email:email},{password:0});
}
function newUser(req,res,next){
	let createNewUser = new User({
		email:req.body.email,
		password:req.body.password,
		mobileNumber:req.body.mobileNumber
	});
	createNewUser.save((err)=>{
		if(err){
			return next(boom.internal(err));
		}
		else{
			res.json({statusCode:200,message:'User created successfully'});
		}
	});
}
function userSignin(req,res,next) {
		passport.authenticate('local', (err, user, info) => {
		if (err) { 
			return next(boom.internal(err)); 
		}
		if (!user) {
			return next(boom.badRequest('Please check your username or password'));
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(boom.internal(err));
			}
			else{
				//create jwt token
				var payload = helper.createJwtPayload(user.id); 
				var token = helper.createJWTToken(payload);
				var refreshToken = helper.generateRefreshToken(user.id);
				helper.saveRefreshToken(user.id,refreshToken);
				res.json({ statusCode: 200, message: 'Successfull!',token: token , user:user._id, refreshToken:refreshToken});
			}
		});
	})(req, res, next);
}	

function newToken(req, res, next) {
	if(req.body.refreshToken){
		Token.findOne({refreshToken:req.body.refreshToken},(err,tokenInfo)=>{
			if(err){
				return next(boom.internal(err));
			}
			else if(tokenInfo){
				if(tokenInfo.expiredAt>Date.now()){
					var payload = helper.createJwtPayload(tokenInfo.userId);
					var token = helper.createJWTToken(payload);
					res.json({statusCode:200,token:token,user:tokenInfo.userId ,refreshToken:tokenInfo.refreshToken });
				}
				else{
					return next(boom.badRequest('invalid token'));
				}
			}
			else{
				return next(boom.badRequest('invalid token'));
			}
		});
	}
	else{
		return next(boom.unauthorized('Unauthorized user'));
	}
}
exports.signup=signup;
exports.signin=signin;
exports.signout=signout;
exports.newToken=newToken