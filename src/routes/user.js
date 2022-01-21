const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          count: result.length,
          data: result.map((user) => {
            return {
              email: user.email,
              password: user.password,
              request: {
                type: "POST",
                url: "https://7y9tj.sse.codesandbox.io/users/signUp",
                body: {
                  email: "String",
                  password: "String"
                }
              }
            };
          })
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      } else {
        bcrypt.compare(password, result[0].password, (err, rest) => {
          if (err) {
            return res.status(401).json({
              message: "Auth Failed"
            });
          }
          if (rest) {
            const token = jwt.sign(
              {
                email: result[0].email,
                password: result[0].password
              },
              "SECRET_KEY",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth Sucessfull",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth Failed"
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/signUp", (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: "Mial exists"
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hash
            });

            newUser
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });

  router.delete("/:userId", (req, res, next) => {
    const { userId } = req.params;
    User.remove({ _id: userId })
      .then((doc) => {
        res.status(200).json({
          message: "user deleted"
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;
