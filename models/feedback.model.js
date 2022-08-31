const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback = Schema({
    tagname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 15
    },
    feed: {
        type: String,
        trim: true,
        maxLength: 500
    }
}
);

module.exports = mongoose.model("FeedbackModel", Feedback);
