const jwt = require("jsonwebtoken");
const config = require("./config");

const checkToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if(token == null) return res.status(403).json({msg: "error"});
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, config.key, (err, decoded) => {
            if(err){
                return res.status(403).json({status: false, msg: "Your session has expired, please login again"});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.status(403).json({status: false, msg: "error"});
    }
};

const checkTokenNU = (req, res, next) => {
    let token = req.headers["authorization"];
    if(token == null) return res.status(403).json({msg: "error11"});
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, config.key1, (err, decoded) => {
            if(err){
                return res.status(403).json({status: false, msg: "Your Token is invalid"});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.status(403).json({status: false, msg: "Token is null"});
    }
};

const checkTokenRP = (req, res, next) => {
    let token = req.headers["authorization"];
    if(token == null) return res.status(403).json({msg: "error"});
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, config.key2, (err, decoded) => {
            if(err){
                return res.status(403).json({status: false, msg: "Your Token is invalid"});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.status(403).json({status: false, msg: "Token is null"});
    }
};

module.exports = {
    checkToken : checkToken,
    checkTokenNU : checkTokenNU,
    checkTokenRP : checkTokenRP,
};
