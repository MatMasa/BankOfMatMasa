const User = require("../models/user");
const Account = require("../models/bankingAccount")
const bcrypt = require('bcryptjs');
var chance = require('chance').Chance();
getUserData = body => {
    return {
        fName: body.fName,
        lName: body.lName,
        email: body.email,
        password: body.password,
        confirmPassword: body.retypePassword,
        phonenumber: body.phonenumber,
        address: body.address,
        city: body.city,
        zip: body.zip,

    };
};

module.exports = {

    generateData: (req, res, next) => {
        res.json({
            fName: chance.first(),
            lName: chance.last(),
            email: chance.email(),
            password: chance.hash(),
            confirmPassword: chance.hash(),
            phonenumber: chance.phone({
                country: "us",
                mobile: true
            }),
            address: chance.address(),
            city: chance.city(),
            zip: chance.zip(),
        })
    },


    // Get all data from users, stored in json
    fetchAll: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.render('userManagement', {
                allUsers
            });
        } catch (err) {
            res.render('error', {
                code: err
            });
        }
    },

    fetchById: async (req, res) => {
        try {
            const userById = await User.findById(req.params.id)
            res.render('profile', {
                user: userById
            })
        } catch (err) {
            res.render('error', {
                code: err
            })
        }
    },

    getProfile: (req, res) => {
        res.render('profile')
    },

    getRegister: (req, res) => {
        res.render('register')
    },

    getEdit: (req, res) => {
        res.render('edit')
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("edit", {
                    user: user
                });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = {
                name: req.body.name,
                email: req.body.email,

            };
        User.findByIdAndUpdate(userId, {
                $set: userParams
            })
            .then(user => {
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    },


    delete: (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then(() => {
                req.flash("success_msg", "User deleted!");
                res.redirect('back');
                next();
            })
            .catch(error => {
                req.flash("error_msg", "Failed to delete user:" + error.message);
                console.log(`Failed to delete user: ${error.message}`);
                next();
            })
    },

    register: async (req, res) => {

        let userData = getUserData(req.body);
        let errors = [];
        if (!userData.fName || !userData.email || !userData.password || !userData.confirmPassword) {
            errors.push({
                msg: 'Fill in all fields to register!'
            })
        }
        if (userData.password !== userData.confirmPassword) {
            errors.push({
                msg: 'Passwords do not match!'
            })
        }

        if (errors.length > 0) {
            res.render('register', {
                errors
            });
        } else {
            User.findOne({
                    email: userData.email
                })
                .then(user => {
                    if (user) {
                        errors.push({
                            msg: 'Email already in use!'
                        })

                        res.render('register', {
                            errors
                        });
                    } else {
                        Account.create({
                            name: "checking account"
                        })

                        const newUser = new User(getUserData(req.body));
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                //Replace plaintext password with password hash
                                newUser.password = hash;
                                //Save user
                                newUser.save()
                                    .then(() => {
                                        req.flash("success_msg", "Account created successfully!");
                                        res.redirect('/')
                                    })
                                    .catch(err => console.log(err))
                            }))
                    }

                })
        }
    }
}