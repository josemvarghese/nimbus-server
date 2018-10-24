const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	refreshToken:String,
	expiredAt:Date
},{
	versionKey: false 
});
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

	