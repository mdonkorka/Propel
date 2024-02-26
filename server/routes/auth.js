const express = require("express");
router = express.Router();
const pool = require ("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post("/logout", async (req, res) => {
  res.clearCookie("authToken", {
    secure: true,
    SameSite: "none"
  }).status(200).json({message: "Successfully logged out"})
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if (user.rows.length == 0) {
      return res.status(400).json({error: 'User does not exist'});
    }
    //Check if the password is correct
    const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);
    if (!passwordCheck) return res.status(400).json({error: "Password or username is incorrect"});

    const token = jwt.sign({ id: user.rows[0].userid}, process.env.SECRET_KEY);
    res.cookie("authToken", token, {
      httpOnly: true, //ensures cookie should only be accessed through HTTP requests and not client-side scripts.
    })
    .status(200).json({message: 'Successfully signed in'});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, username, firstname, lastname, password } = req.body;

    //Check if user already exists
    const emailExists = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({error: 'Email already exists'})
    }
    const usernameExists = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
    if (usernameExists.rows.length > 0) {
      return res.status(400).json({error: 'Username already exists'})
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Add user to database
    const newUser = await pool.query(
      'INSERT INTO Users (email, username, password, firstname, lastname, filledinquestionnaire) VALUES ($1, $2, $3, $4, $5, $6)',
      [email, username,  hashedPassword, firstname, lastname, false]
    );
    res.status(200).json({message: 'User created successfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;

