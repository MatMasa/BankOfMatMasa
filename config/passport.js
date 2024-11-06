import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcryptjs'; // bcryt is used to compare hashed passwords

// Load User model
import { findOne, findById } from '../models/user';

export default function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match user
            findOne({

                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email/password'
                    });
                }

                // Match password hash
                compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Incorrect email/password'
                        });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });
};