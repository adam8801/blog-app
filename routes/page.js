const express = require("express");
const router = express.Router();
const Page = require("../models/page.model");
const Blog = require("../models/blog.model");
const Profile = require("../models/profile.model");
const middleware = require("../middleware");
const clean = require("../clean");
const middle = require("../middle");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const validator = require("validator");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./testPages");
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
		console.log("Not mimetype");
            cb(null, false);
        }
    },
}).single('img');


router.route("/addImage").patch(middleware.checkToken, (req, res) => {
    try{
        req.headers["name"] = validator.blacklist(req.headers["name"],'/.><~');
        Page.findOne(
            {pagename: req.headers["name"]},
            {_id: 0, admins: 1},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "error"});
                else if(result.admins.includes(req.decoded.tagname)){
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
                            return res.status(403).json({msg: "error"});
                        }
                        await sharp("/home/james/apps/menInBlack/testPages/"+req.headers["name"]+".jpg").resize({height: 620}).jpeg({quality: 80})
                        .toFile("/home/james/apps/menInBlack/pages/"+req.headers["name"]+".jpg");
                        return res.json({msg: "ok"});
                      });
                }else{
                    return res.status(403).json({msg: "Error"});
                }
            }
        )
    }catch(err){
        return res.status(403).json({msg: "Error"});
    }
});

router.route("/add").post(middleware.checkToken, clean.addPa, (req, res) => {
        Page.findOne({pagename: req.body.pagename},{_id: 0, owner: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result != null) return res.status(403).json({msg: "This pagename already taken"});
            else{
                const page = Page({
                    pagename: req.body.pagename,
                    subtitle: req.body.subtitle,
                    owner: req.decoded.tagname,
                    about: req.body.about,
                    privateKey: req.body.privateKey,
                    allPost: req.body.allPost,
                    admins: [req.decoded.tagname],
                    members: [req.decoded.tagname]
                });
                page.save()
                .then(() => {
                    Profile.findOneAndUpdate(
                        {tagname: req.decoded.tagname},
                        {
                             $push : { pages: req.body.pagename, created: req.body.pagename } 
                            },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            const msg = {
                                msg: "Page created successfully",
                                //tagname: req.decoded.tagname
                            };
                            return res.json(msg);
                        }
                    );
                })
                .catch((err) => {
                    return res.status(403).json({msg: "error"});
                });
            }
        });
});

router.route("/report").patch(middleware.checkToken, clean.reportPa, (req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}},
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
});

router.route("/request").patch(middleware.checkToken, clean.reportPa, (req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}},
                    {rmembers: {$ne : req.decoded.tagname}}]
            },
            { $push : { rmembers: req.decoded.tagname } }, //check whether already a admin
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                const msg = {
                    msg: "Request sended successfully",
                    //tagname: req.decoded.tagname
                };
                return res.json(msg);
            }
        );
});

router.route("/connect").patch(middleware.checkToken, clean.connectPa, (req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}},
                    {$and: [{admins: {$eq : req.decoded.tagname}},{rmembers: {$eq : req.body.tagname}}]}]
            },
            { $push : { members: req.body.tagname },
              $pull : { rmembers : req.body.tagname }
            }, //check whether already a admin
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "error"});
                else{
                    Profile.findOneAndUpdate(
                        {tagname: req.body.tagname},
                        { $push : { pages: req.body.pagename } },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            const msg = {
                                msg: "Member added successfully",
                                //tagname: req.decoded.tagname
                            };
                            return res.json(msg);
                        }
                    );
                } 
            }
        );
});

router.route("/disconnect").patch(middleware.checkToken, clean.reportPa, middle.ownPdisconnecting, (req, res) => {
        Page.findOneAndUpdate(
            {pagename: req.body.pagename},
            { $pull: {members: req.decoded.tagname, admins: req.decoded.tagname} },
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                const msg = {
                    msg: "Person removed successfully",
                    //tagname: req.decoded.tagname,
                    //data: result
                };
                return res.json(msg);
            }
        );
});

router.route("/updateAdmin").patch(middleware.checkToken, clean.connectPa,(req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}},
                    {$and: [{admins: {$eq : req.decoded.tagname}},{admins: {$ne : req.body.tagname}}]}]
            },
            { $push : { admins: req.body.tagname } }, //check whether already a admin
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null) return res.status(403).json({msg: "error"});
                else{
                    Profile.findOneAndUpdate(
                        {tagname: req.body.tagname},
                        { $push : { created: req.body.pagename } },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            const msg = {
                                msg: "Admin added successfully",
                                //tagname: req.decoded.tagname
                            };
                            return res.json(msg);
                        }
                    );
                }
            }
        );
});

router.route("/removeAdmin").patch(middleware.checkToken , clean.removeAdmin,(req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}},
                    {$and: [{admins: {$eq : req.decoded.tagname}},{admins: {$eq : req.body.tagname}}]}]
            },
            { $pull : { admins: req.body.tagname } }, //check whether already a admin
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if( result == null) return res.status(403).json({msg: "error"});
                else{
                    Profile.findOneAndUpdate(
                        {tagname: req.body.tagname},
                        { $pull : { created: req.body.pagename } },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            const msg = {
                                msg: "Admin removed",
                                //tagname: req.decoded.tagname
                            };
                            return res.json(msg);
                        }
                    );
                }
            }
        );
});

router.route("/removeByAdmin").patch(middleware.checkToken , clean.removeAdmin, (req, res) => {
        Page.findOneAndUpdate(
            {
                $and: [{pagename: {$eq: req.body.pagename}}, {admins: {$eq : req.decoded.tagname}}]
            },
            { $pull: {members: req.body.tagname, admins: req.body.tagname} }, //check whether already a admin
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if( result == null) return res.status(403).json({msg: "error"});
                else{
                    Profile.findOneAndUpdate(
                        {tagname: req.body.tagname},
                        { $pull : {pages: req.body.pagename, created: req.body.pagename }},
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            const msg = {
                                msg: "Member removed",
                                //tagname: req.decoded.tagname
                            };
                            return res.json(msg);
                        }
                    );
                }
            }
        );
});

router.route("/list/:val").get(middleware.checkToken, (req, res) => {
    Page.find({},{pagename: 1, _id: 0, subtitle: 1, members: 1, level: 1},(err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
        else return res.json({data: result});
    }).limit(5).skip(parseInt(req.params.val)).sort({pagename: +1})
    ;
});

router.route("/connectedList/:val").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{pages: 1, _id: 0}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.json({data: []});
        else{
            Page.find(
                {pagename: {$in: result.pages}},
                {pagename: 1, _id: 0, subtitle: 1, members: 1, level: 1},(err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                else return res.json({data: result});
            }).limit(5).skip(parseInt(req.params.val)).sort({pagename: +1});
        }
    });
});

router.route("/personalList/:val").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{created: 1, _id: 0}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.json({data: []});
        else{
            Page.find(
                {pagename: {$in: result.created}},
                {pagename: 1, _id: 0, subtitle: 1, members: 1, level: 1},(err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null || result == []) return res.status(403).json({msg: "You have reached the end"});
                else return res.json({data: result});
            }).limit(5).skip(parseInt(req.params.val)).sort({pagename: +1});
        }
    });
});

router.route("/customList").post(middleware.checkToken, (req, res) => {
    if(req.body.list != null){
        Page.find({pagename: {$in: req.body.list}},{pagename: 1, _id: 0, subtitle: 1, members: 1, level: 1},(err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.json({data: []});
            else return res.json({data: result});
        }).sort({pagename: +1});
    }else{
        return res.status(403).json({msg: "Error"});
    }
});

router.route("/getData").post(middleware.checkToken, clean.reportPa, (req, res) => {
        Page.findOne({pagename: req.body.pagename},{_id: 0 ,about: 1 ,owner: 1 ,admins: 1, reports: 1, pageType: 1, level: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.status(403).json({msg: "error"});
            //if(result.members.includes(req.decoded.tagname)) return res.json({data: result});
            else return res.json({data: result});
        });
});

router.route("/getPersonalData").post(middleware.checkToken, clean.reportPa, (req, res) => {
        Page.findOne(
            {
                $and: [{pagename: {$eq: req.body.pagename}} ,{admins: req.decoded.tagname}]
            },
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                else if(result == null) return res.status(403).json({msg: "error"});
                else return res.json({data: result});
            }
        );
});

router.route("/edit").patch(middleware.checkToken, clean.editPa, (req, res) => {
    let page = {};
    Page.findOne(
        {pagename: req.body.pagename},
        {
            subtitle: 1, _id: 0, about: 1, privateKey: 1, allPost: 1, admins: 1
        },
        (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            else if(result == null) return res.status(403).json({msg: "error"});
            else if(result.admins.includes(req.decoded.tagname)){
                page = result;
                Page.findOneAndUpdate(
                    {pagename: req.body.pagename},
                    {
                        $set: {
                            subtitle: req.body.subtitle ? req.body.subtitle : page.subtitle,
                            about: req.body.about ? req.body.about : page.about,
                            privateKey: req.body.privateKey != null ? req.body.privateKey : page.privateKey,
                            allPost: req.body.allPost != null ? req.body.allPost : page.allPost
                        },
                    },
                    {new: true},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: "error"});
                        if(result == null) return res.status(403).json({msg: "error"});
                        else return res.json({msg: "Updated successfully"});
                    }
                );
            }else{
                return res.status(403).json({msg: "Not allowed"});
            }
        }
    );
});

/*router.route("/delete").post(middleware.checkToken, (req, res) => {
    Page.findOne(
        {pagename: req.body.pagename},{_id: 0, owner: 1}, (err, result) => {
            if(err) return res.status(500).json({msg: err});
            else if(result == null) return res.status(403).json({msg: err});
            else if(result.owner == req.decoded.tagname) {
                Page.findOneAndDelete(
                    {pagename: req.body.pagename},
                    (err, result) => {
                        if(err) return res.status(500).json({msg: err});
                        else if(result == null) return res.status(403).json({msg: err});
                        else{
                            Blog.deleteMany(
                                {name: req.body.pagename},
                                (err ,result) => {
                                    if(err) return res.status(500).json({msg: err});
                                    else if(result == null) return res.status(403).json({msg: err});
                                    else{
                                        Event.deleteMany(
                                            {pagename: req.body.pagename},
                                            (err, result) => {
                                                if(err) return res.status(500).json({msg: err});
                                                else return res.json({msg: "done"});
                                            }
                                        );
                                    }
                                }
                            )
                        }
                    }
                );
            }else{
                return res.status(403).json({msg: "Not allowed"});
            }
        }
    );
});*/


module.exports = router;
