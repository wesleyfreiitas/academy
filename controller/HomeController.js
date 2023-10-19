var knex = require("../database/connection");
var User = require("../model/User");
var bcrypt = require("bcrypt");


class HomeController {
    async index(req, res) {
        await res.render("login")
    }
    async dashboard(req, res) {
        await res.render("index")
    }

    async authenticate(req, res) {
        var {
            email,
            password
        } = req.body;

        var user = await User.findByEmail(email);

        if (user != undefined) {

            var resultado = await bcrypt.compare(password, user.password);

            if (resultado) {
                req.session.user = {
                    name: user.name,
                    id: user.id,
                    email: user.email
                }
                
                res.redirect("/dashboard")

            } else {
                res.status(406);
                res.json({
                    err: "Senha incorreta"
                });

            }

        } else {
            res.status(406);
            res.json({
                status: false,
                err: "Usuário não existe"
            });

        }
    }
}


module.exports = new HomeController();