const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { userName, email, password, avatar } = req.body;
  const user = new userModel({
    userName,
    email,
    password,
    avatar,
    role: "68667f02194eab7ef5910172",
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        user: result,
      });
    })
    .catch((error) => {
      if (error.keyPattern) {
        return res.status(409).json({
          success: false,
          message: "The email is already exist",
        });
      }
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
      console.log("error is here", error);
    });
};

const login = (req, res) => {
  const { password, email } = req.body;
  const lowerEmail = email.toLowerCase();

  userModel
    .findOne({ email: lowerEmail })
    .then(async (result) => {
      console.log("result:", result);
      if (!result) {
        return res.status(403).json({
          success: false,
          message:
            "The email dosen't exist or the password you've entered is incorrect",
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message:
              "The email dosen't exist or the password you've entered is incorrect",
          });
        }
        const payLoad = {
          userId: result._id,
          user: result.userName,
        };
        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payLoad, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: "Valid Login Credintials",
          token: token,
          userId: result._id,
          roleId: result.role,
          userName: result.userName,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
};
