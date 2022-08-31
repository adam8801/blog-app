const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skills = Schema({
    tagname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15
    },
    javaScript: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    swift: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    go: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    python: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    ruby: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    rust: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    c: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    cPlusPlus: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    cSharp: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    kotlin: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    php: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    matlab: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    r: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    sql: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    html: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    css: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    vbDotNet: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    assemblyLevelLanguage: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    java: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    noSql: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    pearl: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    frontend: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    backend: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    fullstack: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    mobile: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    game: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    embedded: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    dataScientist: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    devops: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    software: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    web: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    networkSecurity: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    verilog: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    fpga: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    engineeringDesign: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    boardDesign: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    rubyOnRails: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    django: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    angular: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    laravel: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    express: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    react: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    nodeJs: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    vueDotjs: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    ember: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    xamarin: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    flutter: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    android: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    spring: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    DotNetCore: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    tensorFlow: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    analyticalThinking: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    creativity: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    criticalThinking: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    communicationSkill: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    problemSolving: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    cyberSecurity: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    DL: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    ML: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    VrAr: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    blockchain: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    dataAnalytics: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    iot: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    robotics: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    aerospace: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    arduino: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    raspberryPi: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    linux: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    proteus: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    xilinx: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    labview: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    ltSpice: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    simulink: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    autoCad: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    solidWork: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    ansysFluent: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    microsoftProject: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    excel: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    sketchUp: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    autoCadCivil3d: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    chemcad: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    }
}
);

module.exports = mongoose.model("skisll", Skills);