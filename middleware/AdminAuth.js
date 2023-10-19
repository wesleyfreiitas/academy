function AdminAuth(req, res, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        // res.status(403);
        // res.send("Você não está autenticado");
        res.redirect("/");
    }
}

module.exports = AdminAuth;