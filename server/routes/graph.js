const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.get("/getdata", tokenAuthentication, async (req, res) => {

  //Get the questionnaire data and username 
  data = await pool.query(`SELECT q.*, u.username
                            FROM friends AS f
                            JOIN questionnaire AS q ON f.userid2 = q.userid
                            JOIN users AS u ON f.userid2 = u.userid
                            WHERE f.userid1 = $1 AND f.type = $2;`,
                            [req.id, "friends"]);
  res.status(200).json(data.rows);
});

module.exports = router;