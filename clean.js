const validator = require("validator");

const check = (req, res, next) => {
    if(req.body.username != null && req.body.tagname != null && req.body.email != null ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        req.body.username = validator.blacklist(req.body.username,'/.><~');
        req.body.email = validator.blacklist(req.body.email,'/><~');
	let s = req.body.email.substr(req.body.email.length-12);
	if(s == "@mnnit.ac.in"){
	next();
	}else{
	return res.status(500).json({msg: "Email not supported"});
	}
    }else{
        return res.status(500).json({msg: "error_V"});
    }
};

const register = (req, res, next) => {
    if(req.body.code != null && req.body.password != null && req.body.email != null &&
        req.body.name != null && req.body.status != null && req.body.gender != null && req.body.currentDesignation != null 
        && req.body.location != null && req.body.dob != null && req.body.freeze != null
        ){
	    req.body.email = validator.blacklist(req.body.email,'/><~');
            req.body.password = validator.blacklist(req.body.password,'/.><~');
            req.body.name = validator.blacklist(req.body.name,'/.><~');
            next(); //also check email customization
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const resetPassword = (req, res, next) => {
    if(
        typeof req.body.username === "string" && typeof req.body.tagname === "string" && typeof req.body.email === "string"
        ){
            next(); //also check email customization
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const confirmPassword = (req, res, next) => {
    if(
        typeof req.body.code === "number" && typeof req.body.password === "string" && typeof req.body.email === "string" &&
        validator.isLength(req.body.password, {min: 0, max: 15}) 
        ){
            next(); //also check email customization
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const login = (req, res, next) => {
    if(
        typeof req.body.password === "string" && typeof req.body.username === "string"
        ){
            if( (req.headers['origin']==='https://www.luceroset.me' || req.headers['origin']==='https://luceroset.me') && req.headers['sec-fetch-site']==='same-origin' ){
                req.body.password = validator.blacklist(req.body.password,'/.><~');
                req.body.username = validator.blacklist(req.body.username,'/.><~');
                next();
            }else if(req.headers['sget']==='Marked/relative'){
                req.body.password = validator.blacklist(req.body.password,'/.><~');
                req.body.username = validator.blacklist(req.body.username,'/.><~');
                next();
            }else{
                return res.status(403).json({msg: "error"});
            }
        }else{
            return res.status(403).json({msg: "error"});
        }
};

const getOthersData = (req, res, next) => {
    if(typeof req.body.tagname === "string"){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const requestPr = (req, res, next) => {
    if(typeof req.body.tagname === "string" && req.body.tagname != req.decoded.tagname){
        req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
	next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const connectPr = (req, res, next) => {
    if( typeof req.body.tagname === "string" &&
    validator.isLength(req.body.tagname, {min: 0, max: 15})
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "Error_V"});
    }
};

const disconnectPr = (req, res, next) => {
    if( typeof req.body.tagname === "string" &&
    validator.isLength(req.body.tagname, {min: 0, max: 15})
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "Error_V"});
    }
};

const updatePr = (req, res, next) => {
    if(
        typeof req.body.status === "string" &&
        typeof req.body.currentDesignation === "string" && typeof req.body.location === "string" &&
        typeof req.body.privateKey === "number" && typeof req.body.about === "string" && typeof req.body.freeze === "number" &&
        validator.isLength(req.body.status,{min: 0, max: 100}) && validator.isLength(req.body.currentDesignation,{min: 0, max: 50}) &&
        validator.isLength(req.body.location,{min: 0, max: 50}) && validator.isLength(req.body.about,{min: 0, max: 250}) && req.body.privateKey < 2 &&
        req.body.privateKey > -1 && req.body.freeze < 2 && req.body.freeze > -1
    ){
        let arr;
        arr = req.body.hobbies;
        for(let i=0;i<arr.length;i++){
            if(arr[i].length>100){
                arr[i]="";
            }
        }
        req.body.hobbies = arr;

        arr = req.body.education;
        for(let i=0;i<arr.length;i++){
            if(arr[i].length>100){
                arr[i]="";
            }
        }
        req.body.education = arr;

        arr = req.body.work;
        for(let i=0;i<arr.length;i++){
            if(arr[i].length>100){
                arr[i]="";
            }
        }
        req.body.work = arr;

        arr = req.body.achievements;
        for(let i=0;i<arr.length;i++){
            if(arr[i].length>100){
                arr[i]="";
            }
        }
        req.body.achievements = arr;

        arr = req.body.projects;
        for(let i=0;i<arr.length;i++){
            if(arr[i].length>100){
                arr[i]="";
            }
        }
        req.body.projects = arr;

        next();
    }else{
        return res.status(403).json({msg: "error"});
    }
};

const chats = (req, res, next) => {
    if(
        req.body.tagname != req.decoded.tagname && typeof req.body.tagname === "string"
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "wrong_V"});
    }
};

const postChat = (req, res, next) => {
    if(
        typeof req.body.tagname === "string" &&
        typeof req.body.subject === "string" && validator.isLength(req.body.subject, {min: 0, max: 50})
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const postFeedback = (req, res, next) => {
    if(
        typeof req.body.feed === "string" && validator.isLength(req.body.feed, {min:0, max: 500})
    ){
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const editS = (req, res, next) => {
    if(
        typeof req.body.javaScript === "number" && typeof req.body.swift === "number" && typeof req.body.go === "number" &&
        typeof req.body.python === "number" && typeof req.body.ruby === "number" && typeof req.body.rust === "number" &&
        typeof req.body.c === "number" && typeof req.body.cPlusPlus === "number" && typeof req.body.cSharp === "number" &&
        typeof req.body.kotlin === "number" && typeof req.body.php === "number" && typeof req.body.matlab === "number" &&
        typeof req.body.r === "number" && typeof req.body.sql === "number" && typeof req.body.html === "number" &&
        typeof req.body.css === "number" && typeof req.body.vbDotNet === "number" && typeof req.body.assemblyLevelLanguage === "number" &&
        typeof req.body.java === "number" && typeof req.body.noSql === "number" && typeof req.body.pearl === "number" &&
        typeof req.body.frontend === "number" && typeof req.body.backend === "number" && typeof req.body.fullstack === "number" &&
        typeof req.body.mobile === "number" && typeof req.body.game === "number" && typeof req.body.embedded === "number" &&
        typeof req.body.dataScientist === "number" && typeof req.body.devops === "number" && typeof req.body.software === "number" &&
        typeof req.body.web === "number" && typeof req.body.networkSecurity === "number" && typeof req.body.verilog === "number" &&
        typeof req.body.fpga === "number" && typeof req.body.engineeringDesign === "number" && typeof req.body.boardDesign === "number" &&
        typeof req.body.rubyOnRails === "number" && typeof req.body.django === "number" && typeof req.body.angular === "number" &&
        typeof req.body.laravel === "number" && typeof req.body.express === "number" && typeof req.body.react === "number" &&
        typeof req.body.nodeJs === "number" && typeof req.body.vueDotjs === "number" && typeof req.body.ember === "number" &&
        typeof req.body.xamarin === "number" && typeof req.body.flutter === "number" && typeof req.body.android === "number" &&
        typeof req.body.spring === "number" && typeof req.body.DotNetCore === "number" && typeof req.body.tensorFlow === "number" &&
        typeof req.body.analyticalThinking === "number" && typeof req.body.creativity === "number" && typeof req.body.criticalThinking === "number" &&
        typeof req.body.communicationSkill === "number" && typeof req.body.problemSolving === "number" && typeof req.body.cyberSecurity === "number" &&
        typeof req.body.DL === "number" && typeof req.body.ML === "number" && typeof req.body.VrAr === "number" &&
        typeof req.body.blockchain === "number" && typeof req.body.dataAnalytics === "number" && typeof req.body.iot === "number" &&
        typeof req.body.robotics === "number" && typeof req.body.aerospace === "number" && typeof req.body.arduino === "number" &&
        typeof req.body.raspberryPi === "number" && typeof req.body.linux === "number" && typeof req.body.proteus === "number" &&
        typeof req.body.xilinx === "number" && typeof req.body.labview === "number" && typeof req.body.ltSpice === "number" &&
        typeof req.body.simulink === "number" && typeof req.body.autoCad === "number" && typeof req.body.solidWork === "number" &&
        typeof req.body.ansysFluent === "number" && typeof req.body.microsoftProject === "number" && typeof req.body.excel === "number" &&
        typeof req.body.sketchUp === "number" && typeof req.body.autoCadCivil3d === "number" && typeof req.body.chemcad === "number" 
    ){
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const addPa = (req, res, next) => {
    if(
        req.body.pagename != null && req.body.subtitle != null 
        && req.body.about != null && req.body.privateKey != null && req.body.allPost != null
    ){
	req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "Error_V"});
    }
};

const reportPa = (req, res, next) => {
    if(
        typeof req.body.pagename === "string"
    ){
	req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const connectPa = (req, res, next) => {
    if(
        typeof req.body.pagename === "string" && typeof req.body.tagname === "string" &&
        validator.isLength(req.body.tagname, {min: 0, max: 15})
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const removeAdmin = (req, res, next) => {
    if(
        typeof req.body.pagename === "string" && typeof req.body.tagname === "string"
    ){
	req.body.tagname = validator.blacklist(req.body.tagname,'/.><~');
        req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const editPa = (req, res, next) => {
    if(
        typeof req.body.pagename === "string" && typeof req.body.subtitle === "string" && typeof req.body.about === "string"
        && typeof req.body.privateKey === "number" && typeof req.body.allPost === "number" &&
        validator.isLength(req.body.subtitle,{min:0 , max: 40}) && validator.isLength(req.body.about, {min:0, max: 500})
        && req.body.privateKey > -1 && req.body.privateKey < 2 && req.body.allPost > -1 && req.body.allPost < 2
    ){
	req.body.pagename = validator.blacklist(req.body.pagename,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const pageList = (req, res, next) => {
    if(
        typeof req.body.name === "string"
    ){
	req.body.name = validator.blacklist(req.body.name,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

const testId = (req, res, next) => {
    if(
        typeof req.body.id === "string" 
    ){
	req.body.id = validator.blacklist(req.body.id,'/.><~');
        next();
    }else{
        return res.status(403).json({msg: "error_V"});
    }
}

const testId1 = (req, res, next) => {
    if(
        typeof req.body.id === "string"
    ){
	req.body.id = validator.blacklist(req.body.id,'/.><~');
        if(req.params.type == "c"){
            if(
                typeof req.body.from === "string" && typeof req.body.subject === "string" 
                && validator.isLength(req.body.from, {min:0, max: 40}) && validator.isLength(req.body.subject, {min:0, max: 50})
            ){
		req.body.from = validator.blacklist(req.body.from,'/.><~');
                req.body.subject = validator.blacklist(req.body.subject,'/.><~');
                next();
            }else{
                return res.status(403).json({msg: "error_V"});
            }
        }else{
        next();
        }
    }else{
        return res.status(403).json({msg: "error_V"});
    }
};

module.exports = {
    check: check,
    register: register,
    resetPassword: resetPassword,
    confirmPassword: confirmPassword,
    login: login,
    getOthersData: getOthersData,
    requestPr: requestPr,
    connectPr: connectPr,
    disconnectPr: disconnectPr,
    updatePr: updatePr,
    chats: chats,
    postChat: postChat,
    postFeedback: postFeedback,
    editS: editS,
    addPa: addPa,
    reportPa: reportPa,
    connectPa: connectPa,
    removeAdmin: removeAdmin,
    editPa: editPa,
    pageList: pageList,
    testId: testId,
    testId1: testId1
};
