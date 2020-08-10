const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require('../../config/keys');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
  // debugger
  res.json({ msg: "This is the users route" });
});

const users = [
    { id: 1, handle: "hurricanenara", email: "hello@hello.com", password: "password1234", rank: 1 },
    { id: 2, handle: "blue", email: "hello2@hello.com", password: "password1234", rank: 2, },
    { id: 3, handle: "yellow", email: "hello3@hello.com", password: "password1234", rank: 3 },
    { id: 4, handle: "red", email: "hello3@hello.com", password: "password1234", rank: 6 },
    { id: 5, handle: "orange", email: "hello3@hello.com", password: "password1234", rank: 5 },
    { id: 6, handle: "orange", email: "hello3@hello.com", password: "password1234", rank: 4 },
]

router.get('/', (req, res) => {
    res.status(200).send(users);
})

//login route with validator
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const handle = req.body.handle;
  const password = req.body.password;

  User.findOne({ handle }).then((user) => {
    if (!user) {
      errors.handle = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, handle: user.handle };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

//register route with validator
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ handle: req.body.handle }).then((user) => {
    if (user) {
      errors.handle = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;