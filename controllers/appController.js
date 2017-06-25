var os = require("os");
var path = require("path");
var qs = require("querystring");
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "winter",
    database: "for_manga"
});

module.exports = function(app) {
    app.get("/", function(req, res) {
        // console.log("localhost:3000/public/index.html");
        // req.sendFile("")
    })
    app.get("/detail", function(req, res) {
        var curDir = __dirname;
        var tmp = curDir.split("\\");
        var preDir = "";
        for(var i = 0; i < tmp.length - 1; ++i) {
            preDir += tmp[i] + "\\";
        }
        res.sendFile(preDir + "public/detail.html");
    })
    app.post("/get-manga-infos", function(req, res) {
        var body = "";
        req.on("data", function(data) {
            body += data;
            if(body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on("end", function() {
            var post = qs.parse(body);
            sql = "SELECT * FROM manga_infos WHERE title='" + post.title + "' and author='" + post.author + "'";
            con.query(sql, function(err, results) {
                console.log(post);
                if(err) throw err;
                res.send(results[0]);
            }) 
        })
    })
    app.post("/get-mangas", function(req, res) {
        var body = "";
        req.on("data", function(data) {
            body += data;
            if(body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on("end", function() {
            var post = qs.parse(body);
            if(post.status != undefined) {
                sql = "SELECT * FROM manga_infos WHERE status='" + post.status + "' ORDER BY popularity DESC LIMIT " + post.amount;
            } else {
                sql = "SELECT * FROM manga_infos WHERE tags='" + post.tags + "' ORDER BY popularity DESC LIMIT " + post.amount;
            }
            con.query(sql, function(err, results) {
                if(err) throw err;
                res.send(results);
            })
        })
        // last_update maybe better
    })
}