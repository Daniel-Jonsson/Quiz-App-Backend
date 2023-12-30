/**
 * Authentication middleware.
 * @author Daniel Jönsson, Robert Kullman
 */


/**
 * Middleware checking whether the user has an open authenticated session. If so, 
 * the request may pass. If not, statuscode 401 is sent as a response.
 * @param {*} req request.
 * @param {*} res response.
 * @param {*} next will execute if middleware has not encountered any problems.
 */
module.exports =  function isAuth (req, res, next) {
    req.session.authenticated
		? next()
		: res.status(401).json();
}