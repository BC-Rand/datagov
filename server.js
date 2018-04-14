var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://localhost/my_first_db');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/AngularApp/dist"));



app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./AngularApp/dist/index.html"));
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})