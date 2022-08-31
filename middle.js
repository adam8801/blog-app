const Profile = require("./models/profile.model");

const connecting = (req, res, next) => {
    if(req.body.tagname != null){
        Profile.findOneAndUpdate(
            {
                tagname: {$eq: req.body.tagname}
            },
            { $push : {connections: req.decoded.tagname }},
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "There was an error1"});
                if(result == null) return res.status(403).json({err: "There was an error2"});
                else next();
            }
        );
    }else{
        return res.status(500).json({msg: "error3"});
    }
};

const disconnecting = (req, res, next) => {
    if(req.body.tagname != null){
        Profile.findOneAndUpdate(
            {
                tagname: {$eq: req.body.tagname}
            },
            { $pull : {connections: req.decoded.tagname }},
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "There was an error4"});
                if(result == null) return res.status(403).json({err: "There was an error5"});
                else next();
            }
        );
    }else{
        return res.status(500).json({msg: "error6"});
    }
};

const ownPdisconnecting = (req, res, next) => {
    if(req.body.pagename != null){
        Profile.findOneAndUpdate(
            {
                tagname: {$eq: req.decoded.tagname}
            },
            { $pull : {pages: req.body.pagename, created: req.body.pagename }},
            {new: true},
            (err, result) => {
                if(err) return res.status(500).json({msg: "There was an error7"});
                if(result == null) return res.status(403).json({err: "There was an error8"});
                else next();
            }
        );
    }else{
        return res.status(500).json({msg: "error9"});
    }
};

module.exports = {
    connecting : connecting,
    disconnecting : disconnecting,
    ownPdisconnecting : ownPdisconnecting
};
