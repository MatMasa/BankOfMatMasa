const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: String,
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
/*
    accounts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "account"
    }], */
    phonenumber: String,
    address: String,
    city: String,
    zip: Number,
    created: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


// Virtual for full address
userSchema.virtual('fullName').get(function () {
    return this.fName + ' ' + this.lName;
});
userSchema.virtual('fullAddress').get(function () {
    return this.address + ' ' + this.zip + ' ' + this.city
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);