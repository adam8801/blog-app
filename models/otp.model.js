const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const Otp = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15
    },
    code: {
        type: Number
    },
    newRecord: {
        type: Number,
	enum: [0, 1],
        default: 0
    },
    email: {
        type: String,
	lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxLength: 40,
        validate(value){
	//let s = value.substr(value.lenght-12);
            if(!(validator.isEmail(value))){
                throw new Error("not supported");
            }
        }
    },
    tagname: {
        type: String,
	lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15
    }
});

module.exports = mongoose.model("otpModel", Otp);
