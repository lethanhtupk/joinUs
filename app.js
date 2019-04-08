var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser')

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname,  "/views"));

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'lethanhtupk',
    database: 'join_us'
});

app.get("/", (req, res)=> {
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, (err, result)=> {
        if(err) throw err;
        var count = result[0].count;
        res.render("home", {count: count});
    });
});

app.post("/register", (req, res)=> {
    var email = req.body.email;
    var person ={ email: email };
    var q = "INSERT INTO users SET ?";
    connection.query(q, person, (err, result)=> {
        if(err) throw err;
        res.redirect("/");
    })
    
});

app.listen(8080, ()=> {
    console.log("Server is running at port 8080");
})