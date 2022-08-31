const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comments = Schema({
    by: {
        type: String,
        trim: true,
        maxLength: 15
    },
    from: {
        type: String,
        trim: true,
        maxLength: 40
    },
    subject: {
        type: String,
        trim: true,
        maxLength: 50
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    post: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    flag: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    verify: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    writer: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    heart: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    like: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    share: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    reports: [{
        type: String,
        trim: true,
        maxLength: 15
    }],
    commentNew: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    comment: [comments],
    dateTime: {
        type: Date,
        default: Date.now
    },
    links: [{
        type: String,
        trim: true,
        maxLength: 60
    }],
    img: {
        type: String,
        default: ""
    }
}
);

module.exports = mongoose.model("BlaogModel", Blog);
