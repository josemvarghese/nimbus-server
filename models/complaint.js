const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	email:String,
	heading:String,
	description:String,
	status:{type:Number,default:1},
	createdDate:{ type: Date, default: Date.now },
	updatedDate:{ type: Date, default: Date.now }
},{
	versionKey: false 
});
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;