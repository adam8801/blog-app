const express = require("express");
const router = express.Router();
const Page = require("../models/page.model");
const Admin = require("../models/admin.model");
const Feedback = require("../models/feedback.model");
const bcrypt = require("bcryptjs");
const Profile = require("../models/profile.model");
const Blog = require("../models/blog.model");
const middleware = require("../middleware");
const clean = require("../clean");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const validator = require("validator");

/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.USER,
        pass: process.env.PASS
    }
});

router.route("/mail").post(middleware.checkToken, (req, res) => {
    var mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        subject: 'Message',
        text: 'This is the message you wanted'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({err: "error"});
        }else{
            res.json({msg: info.response});
        }
    });
});*/

/*router.route("/et").post( (req, res) => {
    const et = Et({
        see: req.body.see
    });
    et.save()
    .then(() => {
        return res.json({msg: "Added successfully"});
    })
    .catch((err) => {
        return res.status(400).json({err: err});
    });
});

router.route("/etShow").get((req, res) => {
    Et.find({},(err, result) => {
        if(err) return res.status(500).json({error: err});
        else return res.json({data: result});
    });
});*/

/* router.route("/etAdd").patch(middleware.checkToken, (req, res) => {
    Et.findOneAndUpdate(
        {
            see: req.body.see
        },
        { $push : { person: { $each:[req.body.person],$slice: -4 } } },
        {new: true},
        (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            return res.json({data: result});
        }
    );
});*/

/*router.route("/checkMail").post(middleware.checkToken, (req, res) => {
    let s = req.body.email.substr(req.body.email.length-12);
    if(s == "@mnnit.ac.in"){
        return res.json({msg: "ok"});
    }else{
        return res.json({msg: "sorrry"});
    }
});*/

/*router.route("/eg").post(middleware.checkToken, (req, res) => {
    mongoSanitize.sanitize(req.body,true);
    const eg = Eg({
        writer: req.body.writer,
        like: req.body.like,
        share: req.body.share,
        comment: req.body.comment
    });
    eg.save()
    .then(() => {
        return res.json({msg: "example added successfully",message: req.body});
    })
    .catch((err) => {
        return res.status(400).json({err: err});
    });
});*/

/*router.route("/ftw").post(middleware.checkToken, (req, res) => {
    Eg.find({},{_id: 0, writer: 1, comment: 1}, (err, result) => {
        if(err) return res.status(403).json({err: err});
        else if(result == null) return res.status(403).json({msg: "null"});
        let index = 0;
        let flag = 0;
        result.forEach(fun);
        function fun(item, index){
            if(item.writer == req.body.writer || item.comment == req.body.comment){
                flag = 1;
            }
        }
        if(flag == 1) return res.status(403).json("duplicate");
        else return res.json({msg: "success"});
    });
});*/

/*router.route("/egList").post(middleware.checkToken, (req, res) =>{
    Eg.find({}, (err ,result) =>{
        if(err) return res.json({err : err});
        else {
            //var i = await bcrypt.compare(req.params.t, result.like);
            return res.json({data: result});
        }
    });
});*/

/*router.route("/sanitize").post(middleware.checkToken,
    (req, res) => {
        //mongoSanitize.sanitize(req.body,true);
        //a: req.body.u, b: req.body.p
        //mongoSanitize.sanitize(req.body.p);
        return res.json({message : req.body});
    
});*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./testBlogs");
    },
    filename: (req, file, cb) => {
        cb(null, req.headers["name"]+".jpg");
    },
});

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*3,
    },
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {

            return cb(new Error('Only images are allowed'))
        }if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){

            cb(null, true);
        }else{
            cb(null, false);
        }
    },
}).single('img');

router.route("/addImage").patch(middleware.checkToken, (req, res) => {
    try{
        req.headers["name"] = validator.blacklist(req.headers["name"],'/.><~');
        Blog.findOne(
            {_id: req.headers["name"]},
            {_id: 0, writer: 1},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "Error"});
                else if(result.writer == req.decoded.tagname){
                    upload(req, res, async function (err) {
                        if (err instanceof multer.MulterError) {
                          // A Multer error occurred when uploading.
                          return res.status(500).json({msg: "error"});
                          //console.log("error");
                        } else if (err) {
                          // An unknown error occurred when uploading.
                          return res.status(403).json({msg: "Error"});
                          //console.log("NM error");
                        }
                        if(req.file == null){
                            return res.status(403).json({msg: "Error"});
                        }
                        await sharp("/home/james/apps/menInBlack/testBlogs/"+req.headers["name"]+".jpg").resize({height: 620}).jpeg({quality: 80})
                        .toFile("/home/james/apps/menInBlack/blogs/"+req.headers["name"]+".jpg");
                        // Everything went fine.
                        //console.timeEnd("get upload time");
                        return res.json({msg: "ok"});
                      });
                }else{
                    return res.status(403).json({msg: "Error"});
                }
            }
        );
    }catch(err){
        return res.status(403).json({msg: "Error"});
    }
});

router.route("/add/:type").post(middleware.checkToken, (req, res) => {
    try{
    if(req.body.post != null && req.body.links != null && req.body.flag != null && req.body.links.length < 11){
          let arr = req.body.links
        for(let i=0; i < arr.length; i++){
            if(arr[i].length>60){
                arr[i] = "";
            }
        }
        req.body.links = arr;
            if(req.params.type == "pa"){
                if(req.body.name != null){
                    req.body.name = validator.blacklist(req.body.name,'/.><~');
                    Page.findOne({pagename: req.body.name},{pagename: 1, _id: 0, admins: 1, members: 1, allPost: 1}, (err, result) => {
                        if(result.members.includes(req.decoded.tagname)){
                            if(result.allPost == 1){
                                //console.log("Inside Blog");
                                if(err) return res.status(500).json({msg: "error"});
                                if(result == null) return res.status(403).json({msg: "Some error occured"});
                                else{
                                    var id;
                                    //console.log("Inside Blog Make");
                                    const blog = Blog({
                                    name: req.body.name,
                                    post: req.body.post,
                                    links: req.body.links,
                                    writer: req.decoded.tagname,
                                    flag: req.body.flag
                                });
                                blog.save((err, result) => {
                                    if(err) return res.status(403).json({msg: "error"});
                                    return res.json({msg: "blog posted", id: result.id});
                                });
                            }}else if(result.admins.includes(req.decoded.tagname)){
                                if(err) return res.status(500).json({msg: "error"});
                                if(result == null) return res.status(403).json({msg: "Some error occured"});
                                else{
                                    //console.log("Inside Blog Make");
                                    const blog = Blog({
                                    name: req.body.name,
                                    post: req.body.post,
                                    links: req.body.links,
                                    writer: req.decoded.tagname,
                                    flag: req.body.flag
                                });
                                blog.save((err, result) => {
                                    if(err) return res.status(403).json({msg: "error"});
                                    return res.json({msg: "blog posted", id: result.id});
                                });
                            }
                            }
                            else{
                                return res.status(403).json({msg: "Only Admins are allowed to post"});
                            }
                        }else{
                            return res.status(403).json({msg: "Not Allowed"});
                        }
                    });
                }else{
                    return res.status(403).json({msg: "Error"});
                }
            }else if(req.params.type == "pe"){
                Profile.findOne({tagname: req.decoded.tagname},{_id: 0, tagname: 1}, (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    else if(result == null) {
                        return res.status(403).json({msg : "error"});
                    }
                    else{
                        var id;
                        const blog = Blog({
                            name: req.decoded.tagname,
                            post: req.body.post,
                            links: req.body.links,
                            writer: req.decoded.tagname,
                            flag: req.body.flag
                        });
                        blog.save((err, result) => {
                            if(err) return res.status(403).json({msg: "error"});
                            return res.json({msg: "blog posted", id: result.id});
                        });
                    }
                });
            }else{
                return res.status(403).json({msg: "error"});
            }
    }else{
        return res.status(403).json({msg: "error"});
    }
    }catch(err){
    return res.status(403).json({msg: "error"});
    }
});

router.route("/loginFeed/:val").post(clean.login, (req, res) => {
    if (req.body.username != null && req.body.password != null) {
        Admin.findOne({ username: req.body.username }, { _id: 0, password: 1 }, async (err, result) => {
            if (err) return res.status(500).json({ msg: "error" });
            if (result === null) return res.status(403).json({ msg: "Username incorrect" });
            var i = await bcrypt.compare(req.body.password, result.password);
            if (i) {
                Feedback.find({}, (err, result) => {
                    if (err) return res.status(403).json({ msg: "error" })
                    else return res.json({ data: result });
                }).limit(10).skip(parseInt(req.params.val));
            } else {
                return res.status(403).json({ msg: "Password is incorrect" });
            }
        });
    } else {
        return res.status(500).json({ msg: "error" });
    }
});

router.route("/loginAllBlog/:val").post(clean.login, (req, res) => {
    if (req.body.username != null && req.body.password != null) {
        Admin.findOne({ username: req.body.username }, { _id: 0, password: 1 }, async (err, result) => {
            if (err) return res.status(500).json({ msg: "error" });
            if (result === null) return res.status(403).json({ msg: "Username incorrect" });
            var i = await bcrypt.compare(req.body.password, result.password);
            if (i) {
                Blog.find({verify: 0},(err, result)=>{
                    if(err) return res.status(403).json({msg:"error"})
                    else return res.json({data: result});
                }).limit(10).skip(parseInt(req.params.val));
            } else {
                return res.status(403).json({ msg: "Password is incorrect" });
            }
        });
    } else {
        return res.status(500).json({ msg: "error" });
    }
});

router.route("/loginBlogVerify").patch(clean.login, (req, res) => {
    if (req.body.username != null && req.body.password != null) {
        Admin.findOne({ username: req.body.username }, { _id: 0, password: 1 }, async (err, result) => {
            if (err) return res.status(500).json({ msg: "error" });
            if (result === null) return res.status(403).json({ msg: "Username incorrect" });
            var i = await bcrypt.compare(req.body.password, result.password);
            if (i) {
                Blog.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    { $set : { verify: 1 } },
                    {new: true},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        const msg = {
                            msg: "Done",
                            //tagname: req.decoded.tagname
                        };
                    return res.json(msg);
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

router.route("/pageList/:val").post(middleware.checkToken, clean.pageList, (req, res) => {
        Page.findOne({pagename: req.body.name},{members: 1, _id: 0, privateKey: 1},(err, result) => {
            if(err) res.status(500).json({msg: "error"});
            if(result.members.includes(req.decoded.tagname)){
                Blog.find({name: req.body.name},{comment: 0, verify: 0},(err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                    else return res.json({data: result});
                }).limit(5).skip(parseInt(req.params.val)).sort({dateTime: -1})
                ;
            }else if(result.privateKey == 0){
                Blog.find({name: req.body.name},{comment: 0, verify: 0},(err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null || result == []) return res.status(403).json({msg: "You have reahed the end"});
                    else return res.json({data: result});
                }).limit(5).skip(parseInt(req.params.val)).sort({dateTime: -1})
                ;
            }
            else{
                return res.status(403).json({msg: "Only members can view the content of this page"});
            }
        });
});

router.route("/getOthersPost/:val").post(middleware.checkToken, clean.getOthersData, (req, res) => {
        Profile.findOne({tagname: req.body.tagname},{_id: 0, connections: 1, privateKey: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.status(403).json({msg: "error"});
            else{
                if(result.connections.includes(req.decoded.tagname)){
                    Blog.find(
                        {
                            name: req.body.tagname
                        },{comment: 0, verify: 0},
                        (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                        else return res.json({data: result}); 
                        }
                    ).limit(5).skip(parseInt(req.params.val)).sort({dateTime: -1});
                }else if(result.privateKey == 0){
                    Blog.find(
                        {
                            name: req.body.tagname
                        },{comment: 0, verify: 0},
                        (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                        else return res.json({data: result}); 
                        }
                    ).limit(5).skip(parseInt(req.params.val)).sort({dateTime: -1});
                }else{
                    return res.status(403).json({msg: "This account is private"});
                }
            }
        });
});

router.route("/getMyPost/:val").post(middleware.checkToken, (req, res) => {
    Blog.find(
        {
            name: req.decoded.tagname
        },{comment: 0, verify: 0},
        (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
        else return res.json({data: result}); 
        }
    ).limit(5).skip(parseInt(req.params.val)).sort({dateTime: -1});
});

router.route("/homeList/:val").post(middleware.checkToken, (req, res) => {
    Profile.findOne(
        {tagname: req.decoded.tagname},
        {_id: 0, pages: 1, connections: 1},
        (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.status(403).json({msg: "error"});
        else{
            result.connections.push(req.decoded.tagname);
            Blog.find(
                {
                    $or : [{name: {$in: result.pages}}, {name: {$in: result.connections}}]
                },{comment: 0, verify: 0},
                (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                else return res.json({data: result}); 
                }
            ).limit(10).skip(parseInt(req.params.val)).sort({dateTime: -1});
        }
    });
});

/*router.route("/homeList/:val").post(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.status(403).json({msg: "error"});
        else{
            result.connections.push(req.decoded.tagname);
            Blog.find(
                {
                    $or : [{name: {$in: result.pages}}, {writer: {$in: result.connections}}]
                },{comment: 0},
                (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "You have reached the end"});
                else return res.json({data: result}); 
                }
            ).limit(5).skip(parseInt(req.params.val))
            ;
        }
    });
});*/

router.route("/comments").post(middleware.checkToken, clean.testId, (req, res) => {
        Blog.findOne(
            {_id: req.body.id}, {comment: 1, _id: 0} , (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                return res.json({data: result});
            }
        );
});

router.route("/upVote/:type").patch(middleware.checkToken, clean.testId1, (req, res) => {
        if(req.params.type == "l"){
            Blog.findOneAndUpdate(
                {
                    $and: [{_id: {$eq: req.body.id}},
                        {like: {$ne : req.decoded.tagname}}]
                },
                { $push : { like: req.decoded.tagname } },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    const msg = {
                        msg: "Done",
                        //tagname: req.decoded.tagname
                    };
                return res.json(msg);
                }
            );
        }else if(req.params.type == "h"){
            Blog.findOneAndUpdate(
                {
                    $and: [{_id: {$eq: req.body.id}},
                        {heart: {$ne : req.decoded.tagname}}]
                },
                { $push : { heart: req.decoded.tagname } },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    const msg = {
                        msg: "Done",
                        //tagname: req.decoded.tagname
                    };
                return res.json(msg);
                }
            );
        }
        else if(req.params.type == "s"){
            Blog.findOneAndUpdate(
                {
                    $and: [{_id: {$eq: req.body.id}},
                        {share: {$ne : req.decoded.tagname}}]
                },
                { $push : { share: req.decoded.tagname } },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    const msg = {
                        msg: "Done",
                        //tagname: req.decoded.tagname
                    };
                return res.json(msg);
                }
            );
        }else if(req.params.type == "c"){
                Blog.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    { $push : { comment: { $each:[{by: req.decoded.tagname, from: req.body.from, subject: req.body.subject}],$slice: -50 } },
		      $set: {commentNew: 1}
		    },
                    {new: true},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        const msg = {
                            msg: "Done",
                            //tagname: req.decoded.tagname
                        };
                    return res.json(msg);
                    }
                );
        }else{
           return res.status(403).json({msg: "error"});
        }
});

router.route("/downVote/:type").patch(middleware.checkToken, (req, res) => {
    if(req.body.id != null){
	req.body.id = validator.blacklist(req.body.id,'/.><~');
        if(req.params.type == "l"){
            Blog.findOneAndUpdate(
                {
                    $and: [{_id: {$eq: req.body.id}},
                        {like: {$eq : req.decoded.tagname}}]
                },
                { $pull : { like: req.decoded.tagname } },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "Error"});
                    const msg = {
                        msg: "Done",
                        //tagname: req.decoded.tagname
                    };
                return res.json(msg);
                }
            );
        }else if(req.params.type == "h"){
            Blog.findOneAndUpdate(
                {
                    $and: [{_id: {$eq: req.body.id}},
                        {heart: {$eq : req.decoded.tagname}}]
                },
                { $pull : { heart: req.decoded.tagname } },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "Error"});
                    const msg = {
                        msg: "Done",
                        //tagname: req.decoded.tagname
                    };
                return res.json(msg);
                }
            );
        }else if(req.params.type == "c"){
            if(req.body.subject != null){
                Blog.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    { $pull : { comment: {by: req.decoded.tagname, subject: req.body.subject} } },
                    {new: true},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        const msg = {
                            msg: "Done",
                            //tagname: req.decoded.tagname
                        };
                    return res.json(msg);
                    }
                );
            }else{
                return res.status(403).json({msg: "Error"});
            }
        }else{
            return res.status(403).json({msg: "error"});
        }
    }else{
        return res.status(403).json({msg: "error"});
    }
});

router.route("/report").patch(middleware.checkToken, (req, res) => {
    if(req.body.blogId != null){
	req.body.blogId = validator.blacklist(req.body.blogId,'/.><~');
        Blog.findOneAndUpdate(
            {
                $and: [{_id: {$eq: req.body.blogId}},
                    {reports: {$ne : req.decoded.tagname}}]
            },
            {
                $push : {
                    reports: req.decoded.tagname
                }
            },
            {new: true},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        if(result == null) return res.status(403).json({msg: "error"});
                        else return res.json({msg: "Reported successfully"});
                    }
        );
    }else{
        return res.status(403).json({msg: "Error"});
    }
});

router.route("/delete/:type").post(middleware.checkToken, (req, res) => {
    if(req.params.type == "pa"){
        if(req.body.pagename != null && req.body.id != null){
	    req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
            req.body.id = validator.blacklist(req.body.id,'/.><~');
            Page.findOne({pagename: req.body.pagename},{_id: 0, admins: 1, allPost: 1}, (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                else if(result == null) return res.status(403).json({msg: "error"});
                else if(result.allPost == 0 || result.admins.includes(req.decoded.tagname)){
                    if(result.admins.includes(req.decoded.tagname)){
                        Blog.findOneAndDelete(
                            {
                                $and: [{_id: req.body.id},{name: req.body.pagename}]
                            }, //anyone can delete any blog
                            {_id: 1},
                            (err, result) => {
                                if(err) return res.status(500).json({msg: "error"});
                                if(result == null) return res.status(403).json({msg: "error"});
                                const msg = {
                                    msg : "Blog deleted"
                                };
                                fs.unlink( "/home/james/apps/menInBlack/blogs/"+req.body.id+".jpg", (err) => {
                                    if(err) return res.json(msg);
                                    else return res.json(msg);
                                });
                            }
                        );
                    }else{
                        return res.status(403).json({msg: "Only Admins are allowed"});
                    }
                }else{
                    Blog.findOneAndDelete(
                        {
                            $and: [{_id: req.body.id},{writer: req.decoded.tagname}]
                        },
                        {_id: 1},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            if(result == null) return res.status(403).json({msg: "error"});
                            const msg = {
                                msg : "Blog deleted"
                            };
                            fs.unlink( "/home/james/apps/menInBlack/blogs/"+req.body.id+".jpg", (err) => {
                                if(err) return res.json(msg);
                                else return res.json(msg);
                            });
                        }
                    );
                }
            });
        }else{
            return res.status(403).json({msg: "Error"});
        }
    }else if(req.params.type == "pe"){
        if(req.body.id != null){
            Blog.findOneAndDelete(
                {
                    $and: [{_id: req.body.id},{writer: req.decoded.tagname}]
                },
                {_id: 1},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null) return res.status(403).json({msg: "error"});
                    const msg = {
                        msg : "Blog deleted"
                    };
                    fs.unlink( "/home/james/apps/menInBlack/blogs/"+req.body.id+".jpg", (err) => {
                        if(err) return res.json(msg);
                        else return res.json(msg);
                    });
                }
            );
        }else{
            return res.status(403).json({msg: "error"});
        }
    }else{
        return res.status(403).json({msg: "error"});
    }
});

/*router.route("/delete/:type").post(middleware.checkToken, (req, res) => {
    if(req.params.type == "pa"){
        Page.findOne({pagename: req.body.pagename},{_id: 0, admins: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            else if(result == null) return res.status(403).json({msg: "error"});
            else{
                Blog.findOne(
                    {
                        $and: [{_id: req.body.id},{name: req.body.pagename}]
                    },
                    {_id: 0, writer: 1},
                    (err, result) => {
                        if(result.admins.includes(req.decoded.tagname)){
                            Blog.findOneAndDelete(
                                {_id: req.body.id}, //anyone can delete any blog
                                (err, result) => {
                                    if(err) return res.status(500).json({msg: "error"});
                                    if(result == null) return res.status(403).json({msg : "Error"});
                                    if(result.event == 1){
                                        Event.findOneAndDelete(
                                            {blogId: req.body.id},
                                            (err, result) => {
                                                if(err) return res.status(500).json({msg: "error"});
                                                const msg = {
                                                    msg : "Blog deleted",
                                                    //username: req.params.username
                                                };
                                                return res.json(msg);
                                            }
                                        );
                                    }else{
                                        const msg = {
                                            msg : "Blog deleted",
                                            //username: req.params.username
                                        };
                                        return res.json(msg);
                                    }
                                }
                            );
                        }else{
                            if(result.writer == req.decoded.tagname){
                                Blog.findOneAndDelete(
                                    {_id: req.body.id}, //anyone can delete any blog
                                    (err, result) => {
                                        if(err) return res.status(500).json({msg: "error"});
                                        if(result == null) return res.status(403).json({msg : "Error"});
                                        if(result.event == 1){
                                            Event.findOneAndDelete(
                                                {blogId: req.body.id},
                                                (err, result) => {
                                                    if(err) return res.status(500).json({msg: "error"});
                                                    const msg = {
                                                        msg : "Blog deleted",
                                                        //username: req.params.username
                                                    };
                                                    return res.json(msg);
                                                }
                                            );
                                        }else{
                                            const msg = {
                                                msg : "Blog deleted",
                                                //username: req.params.username
                                            };
                                            return res.json(msg);
                                        }
                                    }
                                );
                            }else{
                                return res.status(403).json({msg: "Only Admins are allowed"});
                            }
                        }
                    }
                );
            }
        });
    }else if(req.params.type == "pe"){

    }else{
        return res.status(403).json({msg: "error"});
    }
});*/

/*router.route("/delete").post(middleware.checkToken, (req, res) => {
    Page.findOne({pagename: req.body.pagename},{_id: 0, admins: 1}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        else if(result == null) return res.status(403).json({msg: "error"});
        else if(result.admins.includes(req.decoded.tagname)){
            Blog.findOneAndDelete(
                {_id: req.body.id}, //anyone can delete any blog
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null) return res.status(403).json({msg : "Error"});
                    if(result.event == 1){
                        Event.findOneAndDelete(
                            {blogId: req.body.id},
                            (err, result) => {
                                if(err) return res.status(500).json({msg: "error"});
                                const msg = {
                                    msg : "Blog deleted",
                                    //username: req.params.username
                                };
                                return res.json(msg);
                            }
                        );
                    }else{
                        const msg = {
                            msg : "Blog deleted",
                            //username: req.params.username
                        };
                        return res.json(msg);
                    }
                }
            );
        }else{
            return res.status(403).json({msg: "Only Admins are allowed"});
        }
    });
});*/

module.exports = router;
