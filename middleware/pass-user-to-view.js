const passUserToView = (req, res, next) => {
    res.locals.user = req.sesion.user ? req.session.user : null
    next()
}

module.exports = passUserToView