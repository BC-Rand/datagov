var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://localhost/datagov_db');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/AngularApp/dist"));

var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is required"],
        minlength: [3, "Usernames must be 3 or more characters"]
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minlength: [8, "Passwords must be 8 or more characters"]
    }
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

var LocationsSchema = new mongoose.Schema({
    Sunday : {
        type: String
    },
    Monday : {
        type: String
    },
    Tuesday : {
        type: String
    },
    Wednesday : {
        type: String
    },
    Thursday : {
        type: String
    },
    Friday : {
        type: String
    },
    Saturday : {
        type: String
    },
    Duration_Hours : {
        type: String
    },
    Day_Time : {
        type: String
    },
    Meal_Served : {
        type: String
    },
    People_Served : {
        type: String
    },
    Address : {
        type: String
    },
    Location : {
        type: String
    },
    Name_of_Program : {
        type: String
    },
    Coordinates: {
        type: Object
    }
})
mongoose.model('locations', LocationsSchema);
var locations = mongoose.model('locations');



app.post('/register', function(req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.findOne({username:req.body.username}, function(err, user) {
        if (user != null) {
            newUser.validate(function(err) {
                if (err) {
                    err["errors"]["username"] = {message: "Try another username"}
                    res.json({message:"Fail", data:err});
                } else {
                    res.json({message:"Fail", data:{"errors":{"username":{"message":"Try another username"}}}});
                }
            });
        } else {
            if (req.body.password != undefined && req.body.password.length >= 8) {
                newUser.password = bcrypt.hashSync(newUser.password);
            } else {
                newUser.password = "";
            }
            newUser.save(function(err) {
                if (err) {
                    res.json({message:"Fail",data:err});
                } else {
                    req.session._id = newUser._id;
                    res.json({message:"Success", data:{username: newUser.username, _id: newUser._id}});
                }
            });
        }
    });
});

app.get('/allLocations', function (req, res) {
    console.log('getting locations in server')
    locations.find({},function(err, locations) {
        if(err){
            console.log("e0rr0r")
        }else{
            res.json({message:'The Locations', locations: locations})
        }
    })
})

app.post('/updatecoordinates', function(req, res) {
    // console.log("/updatecoordinates");
    // console.log(req.body);
    locations.findOne({_id: req.body._id}, function(err, location) {
        if (location != null) {
            location.Coordinates = req.body.coordinates;
            location.save(function(err) {
                if (err) {
                    res.json({message:"Fail", data:err});
                } else {
                    res.json({message:"Success", data:location});
                }
            })
        } else {
            res.json({message:"Fail", data:{}});
        }
    });
});

app.post('/login', function(req, res) {
    User.findOne({username:req.body.username}, function(err, user) {
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session._id = user._id;
                res.json({message:"Success", data:{username:user.username, _id:user._id}});
            } else {
                res.json({message:"Fail", data:{"errors":{"username":{"message":"Invalid login attempt"}}}});
            }
        } else {
            res.json({message:"Fail", data:{"errors":{"username":{"message":"That username does not exist"}}}});
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./AngularApp/dist/index.html"));
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})