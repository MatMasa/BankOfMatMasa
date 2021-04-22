const mongoose = require("mongoose");
bankAccountSchema = mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
    name: {
        type: String
    },

    balance: {
        type: Number,
        min: 0,
        default: 0
    }
});



module.exports = mongoose.model("Account", bankAccountSchema);