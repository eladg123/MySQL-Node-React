const express = require('express')
const authMiddleWare = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/dbConnection')
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const UserSchema = require('../schemas/UserSchema');
const User = require('../models/UserModel')

// login
router.route('/login').post((req, res) => {
    if (validator.body(UserSchema)) {
        const username = req.body.username;
        const password = req.body.password;
        db.query('SELECT * FROM users WHERE username = ?;', [username],
            (err, result) => {
                if (err) {
                    res.send({ err: err })
                } else {
                    if (result.length > 0) {

                        bcrypt.compare(password, result[0].password, (error, response) => {
                            if (response) {
                                const id = result[0].id
                                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                                    expiresIn: 300,
                                })
                                res.json({ auth: true, token: token, currentUser: result[0] });
                            } else {
                                res.send({ auth: false, message: 'Wrong user/password ' })
                            }
                        })
                    } else {
                        res.send({ auth: false, message: 'No user exist' })
                    }
                }
            })
    } else {
        res.send({ message: 'Fill all the form according the requirements' })
    }
})

//register:
router.route('/register').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        }
        const user = new User(username, password, isAdmin);
        db.query('INSERT INTO users (username,password,isAdmin) VALUES (?,?,?)', [user.username, hash, user.isAdmin],
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ message: 'User inserted' })
                }
            })
    })
})

//get users list:
router.route('/users').get(authMiddleWare, (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
})

// delete user by id
router.route('/delete/:id').delete(authMiddleWare, (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

module.exports = router;
