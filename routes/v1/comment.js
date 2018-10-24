
const express = require('express');
const comment = express.Router();
const commentController = require('../../controller/comment');
/**
 * @api {post} /api/v1/comment comment
 * @apiVersion 1.0.0
 * @apiGroup Comment
 * @apiName Add comment
 * @apiDescription To comment on a complaint
 * @apiParam {String} complaintId   complaintId
 * @apiParam {String} comment   comment
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
comment.post('/', (req, res, next) => {
	commentController.addComment(req, res, next);
})
/**
 * @api {get} /api/v1/comment/:complaintId  to fetch comments
 * @apiVersion 1.0.0
 * @apiGroup Comment
 * @apiName Fetch comments
 * @apiDescription To fetch comments of a complaint
 * @apiParam {String} complaintId   complaintId
 * @apiSuccess {String} message  sucess message
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
comment.get('/:complaintId',(req, res, next) => {
	commentController.listComments(req, res, next);
})
module.exports = comment;

