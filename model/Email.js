const nodemailer = require("nodemailer");
class Email{
    async sendEmail(to,link){
        try {
            console.log(to)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "wesleydefreiitas01@gmail.com",
                pass: "otqz hwom clbl exsb"
            }
        });

        // otqz hwom clbl exsb
        function sendMail(to,link) {
            const text = `Notamos que houve um acesso a sua conta, este é o link de redefinição de senha ${link}`;
            transporter.sendMail({
                from: "Wesley Freitas <wesleydefreiitas01@gmail.com>",
                to: to,
                subject: "Redefinir senha - UP-ACADEMY",
                text: text
            }).then(message => {
                console.log(message)
                redirect("/")
            }).catch(err => {
                console.log(err)
            })
        }
        sendMail(to,link)
        res.redirect("/")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Email();