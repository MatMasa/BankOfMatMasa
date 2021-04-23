const passport = require("passport");
const newsController = require('./newsController');
const User = require("../models/user");

module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to access that resource');
        res.redirect('/');
    },
    
    isAdmin: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (User.isAdmin) {
                return next()
            }
        }
        res.redirect('back')
    }, 


    getLogin: async (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        }

        const fetchNews = await newsController.fetchAll()
        res.render('login', {
            allNews: fetchNews
        });
    },
    getDashboard: (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/')
        }
        res.render('admin', {
            test: newsController.fetchNews
        });
    },

    login: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    },
    logout: (req, res, next) => {
        req.logout();
        req.session.destroy(err => {
            if (!err) {
                res.status(200).clearCookie('connect.sid', {
                    path: '/'
                }).redirect('/')
            } else {
                console.log("failed to clear cookie:" + err)
            }
        })

    }

}