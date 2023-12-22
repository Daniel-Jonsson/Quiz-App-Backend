module.exports =  function isAuth (req, res, next) {
    req.session.authenticated
		? next()
		: res.status(400).json({ message: "Not authenticated." });
}