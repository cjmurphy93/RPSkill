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
    { id: 1, handle: "hurricanenara", email: "hello@hello.com", password: "password1234", performance: [], friends: [] },
    { id: 2, handle: "blue", email: "hello2@hello.com", password: "password1234", performance: [], friends: [] },
    { id: 3, handle: "yellow", email: "hello3@hello.com", password: "password1234", performance: [], friends: [] },
    { id: 4, handle: "red", email: "hello3@hello.com", password: "password1234", performance: [], friends: [] },
    { id: 5, handle: "orange", email: "hello3@hello.com", password: "password1234", performance: [], friends: [] },
    { id: 6, handle: "orange", email: "hello3@hello.com", password: "password1234", performance: [], friends: [] },
]

// get all users
router.get('/', (req, res) => {
    res.status(200).send(users);
})

// get specific user
router.get('/:id', (req, res) => {
    const user = users.find((userObj) => userObj.id === Number(req.params.id));
    // debugger
    res.status(200).send(user);
})

// update attribute (performance for now)
router.patch("/:id/", (req, res) => {
  const user = users.find((userObj) => userObj.id === Number(req.params.id));
  if (user) {
      user.performance.push(req.query.performance); //query will be the result of the game in performance=W or performance=L for each player
      res.send(user.performance);
  } else {
    res.status(404).send();
  }

});

// add friend route
router.patch('/:id/', (req, res) => {
    const user = users.find(userObj => userObj.id === Number(req.params.id))
    if (user) {
        user.friends.push(req.query.friend) //query will be the other user's id you're trying to add sent in friend=num format
        res.send(user.friends) // decide whether to send anything;
    } else {
        res.status(400).send();
    }
});

// remove friend route
router.delete('/:id/', (req, res) => {
    const userIdx = users.findIndex(userObj => userObj.id === Number(req.params.id))
    if (userIdx > 0) {
        users.splice(userIdx, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
    // user.friends.push(req.query.friend) //query will be the other user's id you're trying to add sent in friend=num format
});

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