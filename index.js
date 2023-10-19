var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var session = require("express-session");
var router = require("./routes/routes")
 
// View engine
app.set('view engine','ejs');

// Sessions

app.use(session({
    secret: "VN#eI%ShNu1JL3Pg$19g", cookie: { maxAge: 30000000 }
}))

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/",router);

app.listen(3000,() => {
    console.log("Servidor rodando")
});