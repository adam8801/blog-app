const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.model");
const Chat = require("../models/chat.model");
const Feedback = require("../models/feedback.model");
const middleware = require("../middleware");
const middle = require("../middle");
const clean = require("../clean");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

/*router.route("/register").post( (req, res) => {
    const profile = new  Profile({
        tagname: req.body.tagname,
        name: req.body.name,
        status: req.body.status,
        age: req.body.age,
        gender: req.body.gender,
        currentDesignation: req.body.currentDesignation,
        location: req.body.location,
        dob: req.body.dob,
        email: req.body.email,
    });
    profile.save()
    .then(() => {
        return res.json({msg: "profile updated succeddfully"});
    })
    .catch((err) => {
        return res.status(400).json({err: err});
    });
});*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./testProfiles");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.tagname+".jpg");
    },
});

/*const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true);
    }else{
        cb(null, false);
    }
};*/

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

router.route("/addImage").patch(middleware.checkToken, function (req, res) {
    
    try{
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json({msg: "error"});
            } else if (err) {
              return res.status(403).json({msg: "error"});
            }
            if(req.file == null){
                return res.status(403).json({msg: "error"});
            }
            await sharp("/home/james/apps/menInBlack/testProfiles/"+req.decoded.tagname+".jpg").resize({height: 620}).jpeg({quality: 80})
            .toFile("/home/james/apps/menInBlack/profiles/"+req.decoded.tagname+".jpg");
            return res.json({msg: "ok"});
          });
    }catch(err){
        return res.status(403).json({msg: "ok"});
    }

});

//router.route("/some").get(middleware.checkToken, (req, res) => {
   // req.body.message = "No";
  //  return res.json({msg: req.body.message});
//});

/*const upload = multer({
    storage: storage,
    //onError : function(err, next) {
     //   console.log('error',err);
    //}
});*/

/*function uploadFile(req, res, next) {
    const upload = multer().single('img');

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Multter error");
            // A Multer error occurred when uploading.
        } else if (err) {
            console.log("Unknown error");
            // An unknown error occurred when uploading.
        }
        // Everything went fine. 
        next(err);
    });
}*/

//router.route("/addImage").patch(uploadFile, (req, res) => {
//    res.json({msg: "ok"});
//});

//adding and updating profile image
/*router.route("/addImage")
    .patch(middleware.checkToken, upload.single("img"), (req, res) => {
        res.json({msg: "ok"});
});*/

//check Profile Data
/*router.route("/check").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{_id: 0, tagname: 1}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        else if(result == null) {
            return res.status(403).json({msg: "error"});
        }
        else{
            return res.json({tagname: req.decoded.tagname});
        }
    });
});*/

router.route("/getOthersData").post(middleware.checkToken, clean.getOthersData, (req, res) => {
        Profile.findOne({tagname: req.body.tagname},
            {
                name: 1, status: 1, level: 1, gender: 1, currentDesignation: 1, location: 1, dob: 1, hobbies: 1,
                education: 1, work: 1, achievements: 1, about: 1, freeze: 1, privateKey: 1, projects: 1, connections: 1,
                created: 1, pages: 1
            },
            (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.status(403).json({msg: "error"});
            else return res.json({data: result});
        });
});

router.route("/getMyData").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{rconnections: 0, email: 0}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.status(403).json({msg: "Error"});
        else return res.json({data: result});
    });
});

router.route("/getRequests").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{rconnections: 1, _id: 0}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.json({data: []});
        else return res.json({data: result});
    });
});

router.route("/getConnections").get(middleware.checkToken, (req, res) => {
    Profile.findOne({tagname: req.decoded.tagname},{connections: 1, _id: 0}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.json({data: []});
        else return res.json({data: result});
    });
});

router.route("/customList").post(middleware.checkToken, (req, res) => {
    if(req.body.list != null){
        Profile.find({tagname: {$in: req.body.list}},{tagname: 1, _id: 0, status: 1, name: 1, level: 1},(err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            if(result == null) return res.json({data: []});
            else return res.json({data: result});
        }).sort({name: +1})
        ;
    }else{
        return res.status(500).json({msg: "error"});
    }
});

router.route("/list/:val").get(middleware.checkToken, (req, res) => {
    Profile.find({},{tagname: 1, _id: 0, status: 1, name: 1, level: 1},(err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        if(result == null) return res.json({data: []});
        else return res.json({data: result});
    }).limit(5).skip(parseInt(req.params.val)).sort({name: +1})
    ;
});

router.route("/request").patch(middleware.checkToken, clean.requestPr, (req, res) => {
        Profile.findOneAndUpdate(
            {
                $and: [{tagname: {$eq: req.body.tagname}},
                    {rconnections: {$ne : req.decoded.tagname}}] // check also whether tagname is not in connections
            },
            { $push : { rconnections: req.decoded.tagname } },
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

router.route("/connect").patch(middleware.checkToken, middle.connecting, clean.connectPr, (req, res) => {
        Profile.findOneAndUpdate(
            {
                $and: [{tagname: {$eq: req.decoded.tagname}},
                    {$and : [{connections: {$ne : req.body.tagname}},{rconnections: {$eq : req.body.tagname}}]}]
            },
            { $push : {connections: req.body.tagname },
              $pull : {rconnections : req.body.tagname}
            },
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                const msg = {
                    msg: "Request accepted successfully",
                    //tagname: req.decoded.tagname
                };
                return res.json(msg);
            }
        );
});

router.route("/disconnect").patch(middleware.checkToken, middle.disconnecting, clean.disconnectPr, (req, res) => {
        Profile.findOneAndUpdate(
            {
                $and: [{tagname: {$eq: req.decoded.tagname}},
                    {connections: {$eq : req.body.tagname}}]
            },
            { 
              $pull : {connections : req.body.tagname}
            },
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                const msg = {
                    msg: "Connection removed successfully",
                    //tagname: req.decoded.tagname
                };
                return res.json(msg);
            }
        );
});

router.route("/update").patch(middleware.checkToken, clean.updatePr, (req, res) => {
        let profile = {};
    Profile.findOne({tagname: req.decoded.tagname},
        {
            _id: 0, status: 1, currentDesignation: 1, location: 1, hobbies: 1, education: 1, work: 1,
            achievements: 1, privateKey: 1, projects: 1, about: 1, freeze: 1
        },
        (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        else if(result == null) return res.status(403).json({msg: "error"});
        else{
            profile = result;
            Profile.findOneAndUpdate(
                {tagname: req.decoded.tagname},
                {
                    $set: {
                        status: req.body.status ? req.body.status : profile.status,
                        currentDesignation: req.body.currentDesignation ? req.body.currentDesignation : profile.currentDesignation,
                        location: req.body.location ? req.body.location : profile.location,
                        hobbies: typeof req.body.hobbies[0] === "string" && req.body.hobbies.length < 11 ? req.body.hobbies : profile.hobbies,
                        education: typeof req.body.education[0] === "string" && req.body.education.length < 11 ? req.body.education : profile.education,
                        work: typeof req.body.work[0] === "string" && req.body.work.length < 11 ? req.body.work : profile.work,
                        achievements: typeof req.body.achievements[0] === "string"  && req.body.achievements.length < 11 ? req.body.achievements : profile.achievements,
                        privateKey: req.body.privateKey != null ? req.body.privateKey : profile.privateKey,
                        projects: typeof req.body.projects[0] === "string" && req.body.projects.length < 11 ? req.body.projects : profile.projects,
                        about: req.body.about ? req.body.about : profile.about,
                        freeze: req.body.freeze != null ? req.body.freeze : profile.freeze
                    },
                },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null) return res.status(403).json({msg: "error"});
                    else return res.json({msg: "Updated successfully"});
                });
        }
    });
});

router.route("/chatsList").get(middleware.checkToken, (req, res) => {
    Chat.find(
        {
            $and: [{changed: 1},
                {$or: [{holder1: req.decoded.tagname},{holder2: req.decoded.tagname}]}]
        },{holder2: 1, _id: 0, holder1: 1, name1: 1, name2: 1},
        (err, result) => {
            if(err) return res.status(500).json({msg: "Error"});
            return res.json({data: result});
        }
    );
});

router.route("/chats").post(middleware.checkToken, clean.chats, (req, res) => {
        if(req.decoded.tagname.localeCompare(req.body.tagname) < 0){
            var refName = req.decoded.tagname.concat(req.body.tagname);
        }else{
            var refName = req.body.tagname.concat(req.decoded.tagname);
        }
    
        Chat.findOne(
            {refName: refName},{_id: 0, holder1: 1, holder2: 1},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                else if(result == null){
                    Profile.find(
                        {tagname: {$in: [req.body.tagname, req.decoded.tagname]}},{_id: 0, name: 1},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            else if(result == null) return res.status(403).json({msg: "Result null"});
                            else{
                                const chat = new Chat({
                                    refName: refName,
                                    holder1 : req.decoded.tagname,
                                    holder2 : req.body.tagname,
                                    last : req.decoded.tagname,
                                    name1 : result[0].name,
                                    name2 : result[1].name
                                });
                                chat.save()
                                .then(() => {
                                    return res.json({chats: []});
                                })
                                .catch((err) => {
                                    return res.status(403).json({err: "error"});
                                });
                            }
                        }
                    );
                }
                else if(result.holder1 == req.decoded.tagname || result.holder2 == req.decoded.tagname){
                    Chat.findOne(
                        {refName: refName},{last: 1, _id: 0, chats: 1},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            else if(result == null) return res.json({chats: []});
                            else if(result.last == req.decoded.tagname){
                                return res.json({chats: result.chats});
                            }else{
                                Chat.findOneAndUpdate(
                                    {refName: refName},
                                    {
                                        $set: {changed: 0}
                                    },
                                    {new: true},
                                    (err, result) => {
                                        if(err) return res.status(500).json({msg: "error"});
                                        if(result == null) return res.status(403).json({msg: "error"});
                                        else return res.json({chats: result.chats});
                                    }
                                );
                            }
                        }
                    );
                    /*Chat.findOneAndUpdate(
                        {refName: refName},
                        {
                            $set: {changed: 0}
                        },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            if(result == null) return res.status(403).json({msg: "error"});
                            else return res.json({data: result});
                        }
                    );*/
                }else{
                    return res.status(403).json({msg: "Serious Error"});
                }
            }
        );
});

router.route("/postChat").patch(middleware.checkToken, clean.postChat, (req, res) => {
        if(req.decoded.tagname.localeCompare(req.body.tagname) < 0){
            var refName = req.decoded.tagname.concat(req.body.tagname);
        }else{
            var refName = req.body.tagname.concat(req.decoded.tagname);
        }
    
        Chat.findOne(
            {refName: refName},{_id: 0, holder1: 1, holder2: 1},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                else if(result == null) return res.status(403).json({msg: "error"});
                if(result.holder1 == req.decoded.tagname || result.holder2 == req.decoded.tagname){
                    Chat.findOneAndUpdate(
                        {refName: refName},
                        {
                            $push: {chats: { $each:[{by: req.decoded.tagname, subject: req.body.subject}],$slice: -30 }},
                            $set: {changed: 1, last: req.decoded.tagname},
                        },
                        {new: true},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            if(result == null) return res.status(403).json({msg: "error"});
                            else return res.json({msg: "Sended successfully"});
                        }
                    );
                }else{
                    return res.status(403).json({msg: "error"});
                }
            }
        );
});

router.route("/getFeedback").get(middleware.checkToken, (req, res) => {
    Feedback.findOne(
        {tagname: req.decoded.tagname},
        {_id: 0, feed: 1},
        (err, result) => {
            if(err) return res.status(500).json({msg: "Error"});
            if(result == null) return res.status(403).json({msg: "error"});
            else return res.json({data: result});
        }
    );
});

router.route("/postFeedback").patch(middleware.checkToken, clean.postFeedback, (req, res) => {
    if(req.body.feed != null){
        Feedback.findOneAndUpdate(
            {tagname: req.decoded.tagname},
            {
                $set : {
                    feed: req.body.feed
                },
            },
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result == null){
                    const feedback = new Feedback({
                        tagname: req.decoded.tagname,
                        feed: req.body.feed
                    });
                    feedback.save()
                    .then(() => {
                        return res.json({msg: "Sended successfully"});
                    })
                    .catch((err) => {
                        return res.status(403).json({err: "There was an error"});
                    });
                }
                else return res.json({msg: "Sended successfully"});
            }
        );
    }else{
        return res.status(403).json({msg: "error"});
    }
});

module.exports = router;
