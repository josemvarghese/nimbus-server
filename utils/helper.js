const mongoose = require('mongoose');
const User = require('../models/user');
const Complaint = require('../models/complaint');
const Comment = require('../models/comment');
const Token = require('../models/token');
const passportConfig = require('../config/passport');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function createJwtPayload(userid) {
	// 30 minutes
	return { id: userid ,exp:Math.floor(Date.now() / 1000) + (60*30)};
}
// create jwt token
function createJWTToken(payload) {
	return jwt.sign(payload, passportConfig.jwtOptions.secretOrKey);
}
// generate refresh token
function generateRefreshToken(uid){
	return uid.toString()+crypto.randomBytes(40).toString('hex');
}
// save refresh token
function saveRefreshToken(uid,refToken){
	let clientId=uid.toString();
	let currentDate = new Date();
	let expiredAt = currentDate.setMonth(currentDate.getMonth()+6);
	Token.findOne({userId:clientId},(err,tokenInfo)=>{
		if(err){
		}
		else if(tokenInfo){
			tokenInfo.refreshToken=refToken;
			tokenInfo.expiredAt=expiredAt;
			tokenInfo.save();
		}
		else{
			let refreshToken = new Token({
				userId:uid,
				refreshToken:refToken,
				expiredAt:expiredAt
			});
			refreshToken.save();
		}
	});
}
// remove refresh Token
function removeRefreshToken(uid) {
	let clientId=uid.toString();
	Token.findOneAndRemove({clientId:clientId});
}
exports.createJwtPayload=createJwtPayload;
exports.createJWTToken=createJWTToken;
exports.saveRefreshToken=saveRefreshToken;
exports.generateRefreshToken=generateRefreshToken;
exports.removeRefreshToken=removeRefreshToken;



