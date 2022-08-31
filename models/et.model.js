const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Et = Schema({
    see: {
        type: String
    }
}
);

module.exports = mongoose.model("Et", Et);