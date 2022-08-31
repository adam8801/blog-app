const express = require("express");
const User = require("../models/users.model");
const Admin = require("../models/admin.model");
const Otp = require("../models/otp.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const clean = require("../clean");
//const middle = require("../middle");
const Profile = require("../models/profile.model");
const Skills = require("../models/skills.model");
const bcrypt = require("bcryptjs");



const router = express.Router();

/*router.route("/:username").get(middleware.checkToken ,(req, res) => {
    User.findOne({username: req.params.username}, (err, result) => {
        if(err) return res.status(500).json({msg: err});
        return res.json({
            data: result,
            username: req.params.username,
            tagname: req.decoded.tagname
        });
    });
});*/

router.route("/loginOtpList").post(clean.login, (req, res) => {
    if (req.body.username != null && req.body.password != null) {
        Admin.findOne({ username: req.body.username }, { _id: 0, password: 1 }, async (err, result) => {
            if (err) return res.status(500).json({ msg: "error" });
            if (result === null) return res.status(403).json({ msg: "Username incorrect" });
            var i = await bcrypt.compare(req.body.password, result.password);
            if (i) {
                Otp.find({ newRecord: 0 }, (err, result) => {
                    if (err) return res.status(403).json({ msg: "error" })
                    else return res.json({ data: result });
                })
            } else {
                return res.status(403).json({ msg: "Password is incorrect" });
            }
        });
    } else {
        return res.status(500).json({ msg: "error" });
    }
});

router.route("/loginOtpNew").patch(clean.login, (req, res) => {
    if (req.body.username != null && req.body.password != null) {
        Admin.findOne({ username: req.body.username }, { _id: 0, password: 1 }, async (err, result) => {
            if (err) return res.status(500).json({ msg: "error" });
            if (result === null) return res.status(403).json({ msg: "Username incorrect" });
            var i = await bcrypt.compare(req.body.password, result.password);
            if (i) {
                Otp.findOneAndUpdate(
                    {
                         tagname: req.body.tagname
                    },
                    {
                        $set: { newRecord: 1 },
                    },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "error" });
                        if (result == null) return res.status(403).json({ msg: "No record found" });
                        else {
                            return res.json({ msg: "done"});
                        }
                    }
                );
            } else {
                return res.status(403).json({ msg: "Password is incorrect" });
            }
        });
    } else {
        return res.status(500).json({ msg: "error" });
    }
});

// router.route("/adminM").post((req, res)=>{
  //   const admin = new Admin({
    //     username: req.body.username,
      //   password: req.body.password
//     });
 //    admin
  //       .save()
   //      .then(() => {
//             return res.json({msg:"ok"});
 //        })
  //       .catch((err) => {
  //           return res.status(403).json({ msg: err });
  //       });
 //});

router.route("/login").post(clean.login, (req, res) => {
    if(req.body.username != null && req.body.password != null){
        User.findOne({username: req.body.username}, {_id: 0, tagname: 1, password: 1, flag: 1}, async (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result === null) return res.status(403).json({msg: "Username incorrect"});
            if(result.flag == 1) return res.status(403).json({msg: "Account Suspended. Please contact us"});
            var i = await bcrypt.compare(req.body.password, result.password);
            if(i){
                //here we implement jwt token
                let token = jwt.sign({tagname: result.tagname},config.key,{
                    expiresIn: "24h", //expires in 24 hours
                });
                Profile.findOne(
                    {tagname: result.tagname},
                    {_id: 0, freeze: 1},
                    (err, answer) => {
                        if(err) return res.status(500).json({msg: "error"});
                        return res.json({
                            token: token,
                            msg: "success",
                            freeze: answer.freeze.toString(),
                            tagname: result.tagname,
			    admin: 2
                        });
                    }
                );
            }else{
                return res.status(403).json({msg: "Password is incorrect"});
            }
        });
    }else{
        return res.status(500).json({msg: "error"});
    }
});

/*router.route("/checkMail").post((req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'smtp.gmail.com',
	secure: true,
	port: 465,
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    var mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        subject: 'OTP (valid for 1 hour)',
        text: req.body.letter //write here
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return res.status(500).json({msg: error});
        }else{
            return res.json({msg: "Ok"});
        }
    });
});*/

router.route("/check").post(clean.check, (req, res) => {
        var flag1 = 0;
        var flag2 = 0;
        var flag3 = 0;
        var i = Math.floor(Math.random()*1000000) + 1000000;
        Otp.find({}, {_id: 0, tagname: 1, username: 1, email: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            else if(result == null){
                const otp = new Otp({
                    username: req.body.username,
                    email: req.body.email,
                    tagname: req.body.tagname
                });
                otp
                .save()
                .then(() => {
                    Otp.findOneAndUpdate(
                        {username: req.body.username},
                        {
                            $set: {
                                code: i //just for eg
                            },
                        },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            if(result == null) return res.status(500).json({msg: "error"});
                            else{
                                return res.json({msg: "Done"});
                            }
                    });
                })
                .catch((err) => {
                    return res.status(500).json({msg: "error"});
                });
            }
            else{
            let index = 0;
            result.forEach(fun);
            function fun(item, index){
                if(item.username == req.body.username){
                    flag1 = 1;
                }
                if(item.tagname == req.body.tagname){
                    flag2 = 1;
                }
                if(item.email == req.body.email){
                    flag3 = 1;
                }
            }
            if(flag1 == 1 || flag2 == 1 || flag3 == 1){
                const msg = {
                    msg1: flag1 == 1 ? "Username taken" : "",
                    msg2: flag2 == 1 ? "Tagname taken" : "",
                    msg3: flag3 == 1 ? "Email already used in another account" : ""
                };
                return res.status(403).json(msg);
            } 
            else{
                const otp = new Otp({
                    username: req.body.username,
                    email: req.body.email,
                    tagname: req.body.tagname
                });
                otp
                        .save()
                        .then(() => {
                            Otp.findOneAndUpdate(
                                {username: req.body.username},
                                {
                                    $set: {
                                        code: i //just for eg
                                    },
                                },
                                {new: true},
                                (err, result) => {
                                    if(err) return res.status(500).json({msg: "error"});
                                    if(result == null) return res.status(500).json({msg: "error"});
                                    else{
                                        return res.json({msg: "Done"});
                                    }
                            });
                        })
                        .catch((err) => {
                            return res.status(500).json({msg: "error"});
                        });
                }
            } 
        });
});

router.route("/register").post(clean.register, (req, res) => {
        Otp.findOne(
            {
		$and:[{email: req.body.email},{newRecord: 1}]
	    },
            {_id: 0, username: 1, email: 1, tagname: 1, code: 1},
            (err, result) => {
                if(err) return res.status(403).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "No record found"});
                else{
                    if(result.code == req.body.code){
                        const user = new User({
                            username: result.username,
                            password: req.body.password,
                            email: result.email,
                            tagname: result.tagname
                        });
                        user
                        .save()
                        .then(() => {
                            const profile = new  Profile({
                                tagname: result.tagname,
                                name: req.body.name,
                                status: req.body.status,
                                gender: req.body.gender,
                                currentDesignation: req.body.currentDesignation,
                                location: req.body.location,
                                dob: req.body.dob,
                                email: result.email,
                                freeze: req.body.freeze
                            });
                            profile.save()
                            .then(() => {
                                const skill = new  Skills({
                                    tagname: result.tagname,
                                });
                                skill.save()
                                .then(() => {
                                    return res.json({msg : "done"});
                                })
                                .catch((err) => {
                                    return res.status(403).json({msg: "There was an error"});
                                });
                            })
                            .catch((err) => {
                                return res.status(403).json({msg: "There was an error"});
                            });
                        })
                        .catch((err) => {
                            return res.status(403).json({msg: "error"});
                        });
                    }else{
                        return res.status(403).json({msg: "OTP is invalid"});
                    }
                }
            }
        );
});

/*router.route("/resetPassword").patch(clean.resetPassword ,(req, res) => {
    var i = Math.floor(Math.random()*1000000) + 1000000;
    Otp.findOneAndUpdate(
        {
            $and: [{tagname: {$eq: req.body.tagname}},
                {$and: [{username: {$eq : req.body.username}},{email: {$eq : req.body.email}}]}]
        },
        {
            $set: {code: i},
        },
        (err,result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.status(403).json({msg: "No record found"});
            else{
                return res.json({msg: "done"});
            }
        }
    );
});*/

/*router.route("/confirmPassword").patch(clean.confirmPassword, (req, res) => {
    Otp.findOne(
        {email : req.body.email},
        {_id: 0, code: 1, tagname: 1},
        async (err, result) => {
            if(err) return res.status(500).json({mag: "error"});
            if(result == null) return res.status(403).json({msg: "error"});
            else if(result.code == req.body.code){
                var password = await bcrypt.hash(req.body.password, 10); //check for double hash
                User.findOneAndUpdate(
                    {tagname: result.tagname},
                    {
                        $set:{ password: password},
                    },
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        if(result == null) return res.status(403).json({msg: "Error"});
                        else return res.json({msg: "Password Changed"});
                    }
                );
            }else{
                return res.status(403).json({msg: "error"});
            }
        }
    );
});*/

/*router.route("/register").post(middle.middlework ,(req, res) => {
    console.log("inside the register");
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tagname: req.body.tagname
    });
    user
    .save()
    .then(() => {
        console.log("User registered");
        return res.status(200).json({msg: "ok"});
    })
    .catch((err) => {
        return res.status(403).json({msg: "There was an error"});
    });
});*/

/*router.route("/update/:username").patch(middleware.checkToken ,(req, res) => {
    User.findOneAndUpdate(
        {username: req.params.username},
        { $set : { password: req.body.password } },
        {new: true},
        (err, result) => {
            if(err) return res.status(500).json({msg: err});
            const msg = {
                msg: "password updated successfully",
                username: req.params.username
            };
            return res.json(msg);
        }
    );
});

router.route("/delete/:username").delete(middleware.checkToken, (req, res) => {
    User.findOneAndDelete({username: req.params.username}, (err, result) => {
        if(err) return res.status(500).json({msg: err});
        const msg = {
            msg : "account deleted",
            username: req.params.username
        };
        return res.json(msg);
    });
});*/

module.exports = router;
