const boom = require('boom');

module.exports = function(userType) {
	return function(req, res, next) {
		if(req.user.userType==parseInt(userType)){
			next();
		}
		else{
			return next(boom.unauthorized('Unauthorized user')); 
		}
		
	};;
};
