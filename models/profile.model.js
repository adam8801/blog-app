const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const Profile = Schema({
    tagname: {
        type: String,
	lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15
    },
    level: {
        type: Number,
        enum: [0,1,2],
        default: 0
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40
    },
    status: {
        type: String,
        trim: true,
        maxLength: 100
    },
    gender: {
        type: Number, //["male,0","female,1","others,2"]
        required: true,
        enum: [0,1,2]
    },
    currentDesignation: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    dob: {
        type: String, //only dates are allowed
        required: true,
        trim: true,
        validate(value){
            if(value.length != 10){
                throw new Error("Invalid format");
            }
        }
    },
    email: {
        type: String, //only email allowed
        required: true,
	lowercase: true,
        unique: true,
        trim: true,
        maxLength: 40,
        validate(value){
            if(!(validator.isEmail(value))){
                throw new Error("not supported");
            }
        }
    },
    hobbies: [{
        type: String,
        trim: true,
        maxLength: 100
    }],
    education: [{
        type: String,
        trim: true,
        maxLength: 100
    }],
    work: [{
        type: String,
        trim: true,
        maxLength: 100
    }],
    achievements: [{
        type: String,
        trim: true,
        maxLength: 100
    }],
    about: {
        type: String,
        trim: true,
        maxLength: 250
    },
    freeze: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    privateKey: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    projects: [{
        type: String,
        trim: true,
        maxLength: 100
    }],
    connections: [{
        type: String,
        trim: true,
        maxLength: 50
    }],
    created: [{
        type: String,
        trim: true,
        maxLength: 40
    }],
    pages: [{
        type: String,
        trim: true,
        maxLength: 40
    }],
    rconnections: [{
        type: String,
        trim: true,
        maxLength: 50
    }],
    img: {
        type: String,
        default: ""
    }
}
);

module.exports = mongoose.model("ProffilesModel", Profile);
