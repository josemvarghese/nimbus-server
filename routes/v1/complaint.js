
const express = require('express');
const complaint = express.Router();
const complaintController = require('../../controller/complaint');
const authorization = require('../../utils/authorization');

/**
 * @api {post} /api/v1/complaint complaint
 * @apiVersion 1.0.0
 * @apiGroup Complaint
 * @apiName Add complaint
 * @apiDescription To complaint 
 * @apiParam {String} heading   heading
 * @apiParam {String} description   description
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
complaint.post('/', (req, res, next) => {
	complaintController.createComplaint(req, res, next);
})
/**
 * @api {get} /api/v1/complaint List complaint
 * @apiVersion 1.0.0
 * @apiGroup Complaint
 * @apiName List complaint
 * @apiDescription List complaint 
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
complaint.get('/', (req, res, next) => {
	complaintController.listComplaints(req, res, next);
});
/**
 * @api {put} /api/v1/complaint Update status
 * @apiVersion 1.0.0
 * @apiGroup Complaint
 * @apiName Update complaint status 
 * @apiDescription Update complaint status 
 * @apiParam {String} complaintId   complaintId
 * @apiParam {String} status   status
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
complaint.put('/',authorization(process.env.AGENT), (req, res, next) => {
	complaintController.complaintStatus(req, res, next);
});
/**
 * @api {get} /api/v1/complaint/:id Complaint details
 * @apiVersion 1.0.0
 * @apiGroup Complaint
 * @apiName Complaint details
 * @apiDescription Complaint details
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
complaint.get('/:id',(req, res, next) => {
	complaintController.complaintDetails(req, res, next);
});

module.exports = complaint;

