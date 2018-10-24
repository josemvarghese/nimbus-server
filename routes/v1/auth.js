
const express = require('express');
const auth = express.Router();
const passportConfig = require('../../config/passport');
const authController = require('../../controller/auth');
/**
 * @api {post} /api/v1/auth/signup Signup
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName signup
 * @apiDescription To sign up using email, password and mobilenumber
 * @apiParam {Email} email   user email
 * @apiParam {String} password   user pasword
 * @apiParam {String} mobileNumber   mobileNumber
 * @apiSuccess {String} message  sucess message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Signup Successfully ...!"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
auth.post('/signup', (req, res, next) => {
	authController.signup(req, res, next);
});
/**
 * @api {post} /api/v1/auth/signin signin
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName signin
 * @apiDescription To sign in using emailand  password 
 * @apiParam {Email} email   user email
 * @apiParam {String} password   user pasword
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
auth.post('/signin', (req, res, next) => {
	authController.signin(req, res, next);
});
/**
 * @api {get} /api/v1/auth/signout signout
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName signout
 * @apiDescription To signout
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
auth.get('/signout',passportConfig.jwtauth,(req, res, next) => {
	authController.signout(req, res, next);
});
/**
 * @api {post} /api/v1/auth/token token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName token
 * @apiDescription To new token
 * @apiParam {String} refreshToken   refreshToken
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
auth.post('/token',(req, res, next) => {
	authController.newToken(req, res, next);
});
module.exports = auth;

