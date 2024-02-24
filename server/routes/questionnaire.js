const express = require("express");
router = express.Router();
const pool = require ("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post("/save", tokenAuthentication, async (req, res) => {
  try {
    const { attendance, absences, faliures, studytime, lastgrade } = req.body;

    //add a new entry to the questionnaire table
    const newQuestionnaire = await pool.query(
      'INSERT INTO questionnaire (userId, attendance, absences, faliures, studytime, lastgrade) VALUES ($1, $2, $3, $4, $5, $6)',
      [req.id, attendance, absences, faliures, studytime, lastgrade]
    );
    res.status(200).json({message: 'Questionnary entry successfully added to the database'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//verify the auth token exists and it's correct
function tokenAuthentication(req, res, next) {
  if (req.cookies && req.cookies.authToken) {
    const authToken = req.cookies.authToken
    jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(400).json({error: 'AuthToken is invalid'});
      req.id = user.id
      next()
    })
  } else {
    return res.status(400).json({error: 'AuthToken missing'});
  }
}

module.exports = router;