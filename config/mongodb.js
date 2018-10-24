'use strict';
var mongoose = require('mongoose');
mongoose.Promise = Promise;
if (process.env.NODE_ENV === 'development') {
	mongoose.set('debug', true);
}
mongoose.connect(
	process.env.MONGODB_URI,{
		keepAlive: 1,
		// useMongoClient: true,
		bufferMaxEntries: 0,
		reconnectTries: 2,
		reconnectInterval: 100,
		useNewUrlParser:true
	});
var db = mongoose.connection;
module.exports = db;
