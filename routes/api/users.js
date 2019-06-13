const express = require("express");
const router = express.Router();
const {User} = require("../../models/user");
const bcrypt = require("bcryptjs");

// route: POST/api/users/register
// desc: register new user
// access: PUBLIC
router.post("/register", (req, res) => {
    const {email, password, fullName, userType, phone, DOB} = req.body;

    // giả định: input valid
    User.findOne({$or: [{email}, {phone}]})
    .then(user => {
        if(user) return Promise.reject({errors: "Email or Phone exists"})

        const newUser = new User({
            email, password, fullName, userType, phone, DOB
        })

        bcrypt.genSalt(10, (err, salt) => {
            if(err) return Promise.reject(err);

            bcrypt.hash(password, salt, (err, hash) => {
                if(err) return Promise.reject(err);

                newUser.password = hash;
                return newUser.save()
                .then(user => res.status(200).json(user))
                .catch(err => res.status(400).json(err))
            })
        })
    })
    .catch(err => res.status(400).json(err))

    // const newUser = new User({email, password, fullName, userType, phone, DOB})
    // newUser.save()
    // .then(user => res.status(200).json(user))
    // .catch(err => res.status(400).json(err))
})


module.exports = router;