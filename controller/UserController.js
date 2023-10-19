var bcrypt = require("bcrypt");

var User = require("../model/User");
var Email = require("../model/Email");

class UserController {
    async index(req, res) {
        res.render("create")
    }

    async create(req, res) {
        var {
            email,
            name,
            password
        } = req.body;

        if (email == undefined || email == '' || email == ' ') {
            res.status(400);
            res.json({
                err: "O e-mail é inválido!"
            })
            return;
        }

        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406);
            res.json({
                err: "O e-mail já está cadastrado!"
            })
            return;
        }


        await User.new(email, password, name);

        res.redirect("/")
    }

    async logout(req, res) {
        req.session.user = undefined;
        res.redirect("/");
    }

    async myAccount(req, res) {
        res.render("myAccount")
    }
    async myAccountPassword(req, res) {
        res.render("password")
    }
    async myAccountCertificate(req, res) {
        res.render("certificate")
    }
    async viewRecover(req, res) {
        res.render("recover")
    }
    async recoverPassword(req, res) {
        var email = req.body.email;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(email + Date.now(), salt).replaceAll("/", "");
        var link = `http://localhost:3000/changepassword/${hash}`
        var findEmail = await User.findEmail(email);
        console.log(findEmail.user[0].id)
        if (findEmail.status == true) {
            var addToken = await User.update(findEmail.user[0].id, hash)
            console.log(addToken)
            if (addToken.status == true) {
                await Email.sendEmail(email, link)
                res.redirect("/")
            } else {
                return {
                    error: true,
                    message: "usuário não existe"
                }
            }
        }
    }
    async viewChange(req, res) {
        const token = req.params.token;
        var result = await User.findToken(token);
        
        if(result.status == true){
            return res.render("change",{token:result.user[0].tokenRefresh})
        }else{
            return res.render("change",{error:"Token já utilizado"})
        }
    }

    async changePassword(req, res) {
        var password = req.body.password;
        var token = req.body.token;
        
        
        var result = await User.changePassword(password,token)
        console.log(result)
        if (result.status == true){
            res.redirect("/")
        }
    }
}

module.exports = new UserController();