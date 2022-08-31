const express = require("express");
const router = express.Router();
const Skills = require("../models/skills.model");
const Profile = require("../models/profile.model");
const middleware = require("../middleware");
const clean = require("../clean");

/*router.route("/create").post(middleware.checkToken, (req, res) => {
    Skills.findOne({tagname: req.decoded.tagname},{tagname: 1, _id: 0}, (err, result) => {
        if(err) return res.json({err: err});
        if(result != null) return res.json({err: "Already created"});
        else{
            const skill = new  Skills({
                tagname: req.decoded.tagname,
            });
            skill.save()
            .then(() => {
                console.log("Skills Done");
                return res.json({msg : "done"});
            })
            .catch((err) => {
                return res.status(403).json({msg: "There was an error"});
            });
        }
    });
});*/

router.route("/getData").get(middleware.checkToken, (req, res) => {
    Skills.findOne(
        {tagname: req.decoded.tagname},
        (err, result) => {
            if(err) return res.status(500).json({msg: "error"});
            else if(result == null) return res.status(403).json({msg: "error"});
            else return res.json({data: result});
        }
    );
});

router.route("/getOthersData").post(middleware.checkToken, clean.getOthersData, (req, res) => {
        Profile.findOne(
            {tagname: req.body.tagname},
            {_id: 0, freeze: 1},
            (err, result) => {
                if(err) return res.status(500).json({msg: "error"});
                if(result.freeze == 0){
                    Skills.findOne(
                        {tagname: req.body.tagname},
                        (err, result) => {
                            if(err) return res.status(500).json({msg: "error"});
                            else if(result == null) return res.status(403).json({msg: "error"});
                            else return res.json({data: result});
                        }
                    );
                }else{
                    return res.status(403).json({msg: "error"});
                }
            }
        );
});

router.route("/edit").patch(middleware.checkToken, clean.editS, (req, res) => {
    let profile = {};
    Skills.findOne({tagname: req.decoded.tagname}, (err, result) => {
        if(err) return res.status(500).json({msg: "error"});
        else if(result == null) return res.status(403).json({msg: "error"});
        else{
             profile = result;
             Skills.findOneAndUpdate({tagname: req.decoded.tagname},
                {
                    $set: {
                        javaScript: req.body.javaScript != null ? req.body.javaScript : profile.javaScript,
                        swift: req.body.swift != null ? req.body.swift : profile.swift,
                        go: req.body.go != null ? req.body.go : profile.go,
                        python: req.body.python != null ? req.body.python : profile.python,
                        ruby: req.body.ruby != null ? req.body.ruby : profile.ruby,
                        rust: req.body.rust != null ? req.body.rust : profile.rust,
                        c: req.body.c != null ? req.body.c : profile.c,
                        cPlusPlus: req.body.cPlusPlus != null ? req.body.cPlusPlus : profile.cPlusPlus,
                        cSharp: req.body.cSharp != null ? req.body.cSharp : profile.cSharp,
                        kotlin: req.body.kotlin != null ? req.body.kotlin : profile.kotlin,
                        php: req.body.php != null ? req.body.php : profile.php,
                        matlab: req.body.matlab != null ? req.body.matlab : profile.matlab,
                        r: req.body.r != null ? req.body.r : profile.r,
                        sql: req.body.sql != null ? req.body.sql : profile.sql,
                        html: req.body.html != null ? req.body.html : profile.html,
                        css: req.body.css != null ? req.body.css : profile.css,
                        vbDotNet: req.body.vbDotNet != null ? req.body.vbDotNet : profile.vbDotNet,
                        assemblyLevelLanguage: req.body.assemblyLevelLanguage != null ? req.body.assemblyLevelLanguage : profile.assemblyLevelLanguage,
                        java: req.body.java != null ? req.body.java : profile.java,
                        noSql: req.body.noSql != null ? req.body.noSql : profile.noSql,
                        pearl: req.body.pearl != null ? req.body.pearl : profile.pearl,
                        frontend: req.body.frontend != null ? req.body.frontend : profile.frontend,
                        backend: req.body.backend != null ? req.body.backend : profile.backend,
                        fullstack: req.body.fullstack != null ? req.body.fullstack : profile.fullstack,
                        mobile: req.body.mobile != null ? req.body.mobile : profile.mobile,
                        game: req.body.game != null ? req.body.game : profile.game,
                        embedded: req.body.embedded != null ? req.body.embedded : profile.embedded,
                        dataScientist: req.body.dataScientist != null ? req.body.dataScientist : profile.dataScientist,
                        devops: req.body.devops != null ? req.body.devops : profile.devops,
                        software: req.body.software != null ? req.body.software : profile.software,
                        web: req.body.web != null ? req.body.web : profile.web,
                        networkSecurity: req.body.networkSecurity != null ? req.body.networkSecurity : profile.networkSecurity,
                        verilog: req.body.verilog != null ? req.body.verilog : profile.verilog,
                        fpga: req.body.fpga != null ? req.body.fpga : profile.fpga,
                        engineeringDesign: req.body.engineeringDesign != null ? req.body.engineeringDesign : profile.engineeringDesign,
                        boardDesign: req.body.boardDesign != null ? req.body.boardDesign : profile.boardDesign,
                        rubyOnRails: req.body.rubyOnRails != null ? req.body.rubyOnRails : profile.rubyOnRails,
                        django: req.body.django != null ? req.body.django : profile.django,
                        angular: req.body.angular != null ? req.body.angular : profile.angular,
                        laravel: req.body.laravel != null ? req.body.laravel : profile.laravel,
                        express: req.body.express != null ? req.body.express : profile.express,
                        react: req.body.react != null ? req.body.react : profile.react,
                        nodeJs: req.body.nodeJs != null ? req.body.nodeJs : profile.nodeJs,
                        vueDotjs: req.body.vueDotjs != null ? req.body.vueDotjs : profile.vueDotjs,
                        ember: req.body.ember != null ? req.body.ember : profile.ember,
                        xamarin: req.body.xamarin != null ? req.body.xamarin : profile.xamarin,
                        flutter: req.body.flutter != null ? req.body.flutter : profile.flutter,
                        android: req.body.android != null ? req.body.android : profile.android,
                        spring: req.body.spring != null ? req.body.spring : profile.spring,
                        DotNetCore: req.body.DotNetCore != null ? req.body.DotNetCore : profile.DotNetCore,
                        tensorFlow: req.body.tensorFlow != null ? req.body.tensorFlow : profile.tensorFlow,
                        analyticalThinking: req.body.analyticalThinking != null ? req.body.analyticalThinking : profile.analyticalThinking,
                        creativity: req.body.creativity != null ? req.body.creativity : profile.creativity,
                        criticalThinking: req.body.criticalThinking != null ? req.body.criticalThinking : profile.criticalThinking,
                        communicationSkill: req.body.communicationSkill != null ? req.body.communicationSkill : profile.communicationSkill,
                        problemSolving: req.body.problemSolving != null ? req.body.problemSolving : profile.problemSolving,
                        cyberSecurity: req.body.cyberSecurity != null ? req.body.cyberSecurity : profile.cyberSecurity,
                        DL: req.body.DL != null ? req.body.DL : profile.DL,
                        ML: req.body.ML != null ? req.body.ML : profile.ML,
                        VrAr: req.body.VrAr != null ? req.body.VrAr : profile.VrAr,
                        blockchain: req.body.blockchain != null ? req.body.blockchain : profile.blockchain,
                        dataAnalytics: req.body.dataAnalytics != null ? req.body.dataAnalytics : profile.dataAnalytics,
                        iot: req.body.iot != null ? req.body.iot : profile.iot,
                        robotics: req.body.robotics != null ? req.body.robotics : profile.robotics,
                        aerospace: req.body.aerospace != null ? req.body.aerospace : profile.aerospace,
                        arduino: req.body.arduino != null ? req.body.arduino : profile.arduino,
                        raspberryPi: req.body.raspberryPi != null ? req.body.raspberryPi : profile.raspberryPi,
                        linux: req.body.linux != null ? req.body.linux : profile.linux,
                        proteus: req.body.proteus != null ? req.body.proteus : profile.proteus,
                        xilinx: req.body.xilinx != null ? req.body.xilinx : profile.xilinx,
                        labview: req.body.labview != null ? req.body.labview : profile.labview,
                        ltSpice: req.body.ltSpice != null ? req.body.ltSpice : profile.ltSpice,
                        simulink: req.body.simulink != null ? req.body.simulink : profile.simulink,
                        autoCad: req.body.autoCad != null ? req.body.autoCad : profile.autoCad,
                        solidWork: req.body.solidWork != null ? req.body.solidWork : profile.solidWork,
                        ansysFluent: req.body.ansysFluent != null ? req.body.ansysFluent : profile.ansysFluent,
                        microsoftProject: req.body.microsoftProject != null ? req.body.microsoftProject : profile.microsoftProject,
                        excel: req.body.excel != null ? req.body.excel : profile.excel,
                        sketchUp: req.body.sketchUp != null ? req.body.sketchUp : profile.sketchUp,
                        autoCadCivil3d: req.body.autoCadCivil3d != null ? req.body.autoCadCivil3d : profile.autoCadCivil3d,
                        chemcad: req.body.chemcad != null ? req.body.chemcad : profile.chemcad
                    }
                },
                {new: true},
                (err, result) => {
                    if(err) return res.status(500).json({msg: "error"});
                    if(result == null) return res.status(403).json({msg: "error"});
                    else return res.json({msg: "updated"});
                });
            }
    });
});

module.exports = router;