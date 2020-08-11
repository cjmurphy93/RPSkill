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
    { id: 1, username: "hurricanenara", email: "hello@hello.com", password: "password1234", performance: ["W", "L", "L", "W"], friends: [] },
    { id: 2, username: "blue", email: "hello2@hello.com", password: "password1234", performance: ["W", "W", "W", "W"], friends: [] },
    { id: 3, username: "yellow", email: "hello3@hello.com", password: "password1234", performance: ["L", "L", "L", "L"], friends: [] },
    { id: 4, username: "red", email: "hello4@hello.com", password: "password1234", performance: ["L", "W", "W", "L"], friends: [] },
    { id: 5, username: "green", email: "hello5@hello.com", password: "password1234", performance: ["W", "L", "L", "L"], friends: [] },
    { id: 6, username: "grey", email: "hello6@hello.com", password: "password1234", performance: ["L", "W", "W", "W"], friends: [] },
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

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      errors.username = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

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

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      errors.username = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
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
              const payload = { id: user.id, username: user.username };

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

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({msg: 'Success'});
})

module.exports = router;