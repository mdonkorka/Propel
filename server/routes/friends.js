const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.get("/getData", tokenAuthentication, async (req, res) => {
  
  const friendsData = await pool.query(
    'SELECT userid2, type FROM friends WHERE userid1 = $1',
    [req.id]
  );
  const friendsMap = {};
  friendsData.rows.forEach(friend => {
    friendsMap[friend.userid2] = friend;
  });
  const friendsIds = friendsData.rows.map(item => item.userid2);
  const usernames = await pool.query(
    'SELECT userid, username FROM users WHERE userid = ANY($1)',
    [friendsIds]
  );
  friends = usernames.rows.map(row => (
    {...friendsMap[row.userid],
      username: row.username
    })
  );
  res.status(200).json(friends);
});

router.post("/add", tokenAuthentication, async (req, res) => {
  const { searchUsername } = req.body;
  console.log(searchUsername);

  //check if the user exists


  //
});

module.exports = router;