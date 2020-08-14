const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require('../../config/keys');
const User = require("../../models/User");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
  //  
  res.json({ msg: "This is the users route" });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    elo: req.user.elo
  });
})

// get all users
router.get('/', (req, res) => {
    User.find()
      .then(users => {
        //  
        res.json(users)
      })
      .catch(err => res.status(404).json({ nousersfound: "No users found"}))
      // res.status(200).send(users);
})

// get specific user
router.get('/:username', (req, res) => {
   
  User.findOne({ username: req.params.username })
    .then((user) => {
       ;
      res.json(user);
    })
    .catch((err) => res.status(404).json({ nouserfound: "No user found" }));
})

// get friend list of specific user
// router.get('/:id/friends', (req, res) => {

// })

// update attribute (performance or friend)
router.patch("/:id/", (req, res) => {
    User.updateOne({ _id: req.params.id },
      { $inc: { elo: req.query.score }} // query string to be requested as ?score=score
    )
    .then(() => {
      res.status(200).json({msg: "points added to user"})
    })
    .catch((err) => res.status(404).json({ msg: "update errors"}))
    // else if (req.params.friend) {
    //   User.updateOne(
    //     { _id: req.params.id },
    //     { $addToSet: { friends: req.query.friend } } // query string ?friend=id
    //   ).then(() => {
    //     res.status(200).send();
    //   });
    // }
  }
);

// // add friend route
// router.patch('/:id/', (req, res) => {
//   User.updateOne({_id: req.params.id},
//       { $addToSet: { friends: req.query.friend }} // query string ?friend=id
//       )
//       .then(() => {
//         res.status(200).send();
//       });
// });

// remove friend route
router.delete('/:id/', (req, res) => {
  User.deleteOne({_id: req.params.id},
    { $pull: { friends: req.query.friend}} // ?friend=userId
    )
    .then(() => {
      res.status(200).send();
    });
});

//login route with validator
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email, username: user.username};

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
              const payload = { id: user.id, email: user.email, username: user.username };

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