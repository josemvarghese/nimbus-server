require('dotenv').config();
var express = require('express');
var helmet = require('helmet');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var v1 = require('./routes/v1/index');
const boom = require('boom');

// mongodb
var mongooseIsConnected = false;
var db = require('./config/mongodb');
db.once('open', function () {
	mongooseIsConnected = true;
});
db.on('error', function (err) {
	mongooseIsConnected = false;
});
db.on('reconnectFailed', () => {
	mongooseIsConnected = false;
});

var app = express();
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*
 * uncomment after placing your favicon in /public
 *app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, Accept');
	next();
});

app.use(passport.initialize());

// app.use(uiroutes);
app.use('/api/v1',v1);
/*
 * app.use('/api/v2',v2);
 * app.get('*', (req, res) => {
 *   res.sendFile(path.join(__dirname, 'client/index1.html'));
 * });
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
	next(boom.notFound());
});

app.use(function (err, req, res, next) {
	if (mongooseIsConnected) {
		if (err.isServer) {
		}
		return res.status(err.output.statusCode).json(err.output.payload);
	}
	else {
		return res.json({ statusCode: 500, message: 'Internal server error' });
	}
});
module.exports = app;
