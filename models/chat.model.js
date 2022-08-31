const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatTile = Schema({
    by: {
        type: String,
        trim: true,
        maxLength: 15
    },
    subject: {
        type: String,
        trim: true,
        maxLength: 50
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
});

const Chat = Schema({
    refName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    chats: [chatTile],
    holder1 : {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    holder2 : {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    changed: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    last: {
        type: String,
        trim: true,
        maxLength: 15
    },
    name1: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40
    },
    name2: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40
    },
}
);

module.exports = mongoose.model("ChatModel", Chat);