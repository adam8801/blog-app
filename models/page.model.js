const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Page = Schema({
    pagename : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 40
    },
    subtitle: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40
    },
    about: {
        type: String,
        trim: true,
        maxLength: 500
    },
    level: {
        type: Number,
        enum: [0,1,2],
        default: 0
    },
    pageType: {
        type: Number,
        enum: [0,1,2],
        default: 0
    },
    owner: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    admins: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    members: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    privateKey: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    allPost: {
        type: Number,
        enum: [0,1],
        default: 1
    },
    rmembers: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    reports: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    img: {
        type: String,
        default: ""
    }
}
);

module.exports = mongoose.model("PagedModel", Page);
