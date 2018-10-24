const boom = require('boom');
const helper = require('../utils/helper');
const mongoose = require('mongoose');
const User = require('../models/user');
const Complaint = require('../models/complaint');
require('async');
require('await');

function createComplaint(req, res, next) {
	let newComplaint = new Complaint({
		heading:req.body.heading,
		description:req.body.description,
		createdBy:req.user._id,
		email:req.user.email
	});
	newComplaint.save((err)=>{
		if(err){
			return next(boom.internal(err)); 
		}
		else{
			res.json({stausCode:200,message:"Complaint recorded successfully"})
		}
	})
}
function listComplaints(req, res, next) {

	let mQuery = Complaint.find({},{heading:1,createdDate:1,updatedDate:1,status:1,email:1}).sort({updatedDate:-1})
	if(req.user.userType==parseInt(process.env.CUSTOMER)){
		mQuery = Complaint.find({createdBy:req.user._id},{heading:1,createdDate:1,updatedDate:1,status:1}).sort({updatedDate:-1})
	}
	mQuery.exec((err,userComplaints)=>{
		if(err){
			return next(boom.internal(err)); 
		}
		else if(userComplaints.length>0){
			res.json({stausCode:200,data:userComplaints})
		}
		else{
			res.json({stausCode:200,data:[],message:"There is no complaints registered yet"})
		}
	})
}

function complaintDetails(req, res, next) {
	let mQuery = Complaint.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
	if(req.user.userType==parseInt(process.env.CUSTOMER)){
		mQuery = Complaint.findOne({_id:mongoose.Types.ObjectId(req.params.id),createdBy:req.user._id})
	}
	mQuery.exec((err,complaintInfo)=>{
			if(err){
				return next(boom.internal(err)); 
			}
			else{
				res.json({stausCode:200,data:complaintInfo})
			}
		})
}
function complaintStatus(req, res, next) {
	Complaint.updateOne({_id:req.body.complaintId},{$set:{updatedDate:new Date(),status:parseInt(req.body.status)}},(err)=>{
		if(err){
				return next(boom.internal(err)); 
		}
		else{
			res.json({stausCode:200,message:"Complaint status updated successfully"})
		}
	})
}
exports.createComplaint=createComplaint;
exports.listComplaints=listComplaints;
exports.complaintDetails=complaintDetails;
exports.complaintStatus=complaintStatus;



