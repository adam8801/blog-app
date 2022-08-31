const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const User = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    flag: {
        type: Number,
        enum: [0,1],
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

User.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("UsersaModel", User);
