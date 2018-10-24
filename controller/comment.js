const boom = require('boom');
const helper = require('../utils/helper');
const mongoose = require('mongoose');
const User = require('../models/user');
const Complaint = require('../models/complaint');
const Comment = require('../models/comment');
require('async');
require('await');

function addComment(req,res,next){
	let agent = true;
	if(req.user.userType==parseInt(process.env.CUSTOMER)){
		agent=false;
	}
	let newComment = new Comment({
		commentedBy:req.user._id,
		complaintId:req.body.complaintId,
		isAgent:agent,
		comment:req.body.comment
	});
	newComment.save((err)=>{
		if(err){
			return next(boom.internal(err)); 
		}
		else{
			res.json({stausCode:200,message:"Comment recorded successfully"})
		}
	});
}
function listComments(req,res,next){
	Comment.find({complaintId:req.params.complaintId},(err,data)=>{
		if(err){
			return next(boom.internal(err)); 
		}
		else{
			res.json({stausCode:200,data:data})
		}
	})
}
exports.addComment=addComment;
exports.listComments=listComments;
