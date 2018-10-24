const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
	commentedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	complaintId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Complaint'
	},
	isAgent:{type:Boolean,default:false},
	createdDate:{ type: Date, default: Date.now },
	comment:String
},{
	versionKey: false 
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;