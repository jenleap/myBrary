const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../util/config');
const User = require('../models/user');

exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser = new User({
                username: req.body.username,
                password: hash,
                projects: []
            });
            newUser.save()
                .then(
                    res.status(201).json({
                        message: "User is registered."
                    })
                )
                .catch(err => {
                    res.status(500).send(err);
                });   
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.login = (req, res) => {
    let retrievedUser;
    User.findOne({ username: req.body.username })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Username or password is incorrect."
            });
        }
        retrievedUser = user;
        return bcrypt.compare(req.body.password, retrievedUser.password);  
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Username or password is incorrect."
            }); 
        }
        const token = jwt.sign({ userId: retrievedUser.id }, 
            config.secret, 
            { expiresIn: "30 days"});
        res.status(200).json({
            token: token
        });
    })
    .catch(err => {
        res.status(500).send(err);
    });
};
