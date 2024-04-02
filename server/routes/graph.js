const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.get("/getdata", tokenAuthentication, async (req, res) => {
  
  //Get the questionnaire data and username 
  friendsData = await pool.query(`SELECT q.*, u.username
                            FROM friends AS f
                            JOIN questionnaire AS q ON f.userid2 = q.userid
                            JOIN users AS u ON f.userid2 = u.userid
                            WHERE (f.userid1 = $1 AND f.type = $2)`,
                            [req.id, "friends"]);
  usersData = await pool.query(`SELECT q.*, u.username
                              FROM questionnaire AS q
                              JOIN users AS u ON q.userid = u.userid
                              WHERE q.userid = $1`,
                              [req.id])
  result = {
    "friendsData": friendsData.rows,
    "usersData": usersData.rows[0]
  }
  
  res.status(200).json(result);
});



module.exports = router;