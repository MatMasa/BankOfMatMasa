const mongoose = require("mongoose");
newsSchema = mongoose.Schema({
    published: {
        type: Date,
        default: Date.now
    },

    heading: {
        type: String,
        required: true
    },

    content: {
        type: String
    }
});



module.exports = mongoose.model("NewsArticle", newsSchema);