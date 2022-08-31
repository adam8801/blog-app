const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const Admin = Schema({
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
        maxLength: 30
    }
});

Admin.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("AdminModel", Admin);