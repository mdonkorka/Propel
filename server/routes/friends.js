const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.get("/topthreeapps", tokenAuthentication, async (req, res) => {
  const {userId} = req.query
  const topthreeapps = await pool.query(`SELECT (name, usecase, link)
                                          FROM topthreeapps
                                          WHERE userid = $1`,
  [userId]);
  return res.status(200).json(topthreeapps.rows);
});

router.post("/acceptIncomingRequest", tokenAuthentication, async (req, res) => {
  const {otherUserId} = req.body
  //delete the old incoming and outgoing requests between the users
  pool.query(`DELETE FROM friends WHERE (userid1 = $1 AND userid2 = $2)
                                     OR (userid1 = $2 AND userid2 = $1)`,
  [req.id, otherUserId]);

  //create new friendship
  pool.query(`INSERT INTO friends (userid1, userid2, type) 
              VALUES ($1, $2, $3), ($4, $5, $6)`,
    [req.id, otherUserId, "friends", otherUserId, req.id, "friends"]);
  return res.status(200).json("Incoming request succesfully accepted");
});

router.post("/removefriend", tokenAuthentication, async (req, res) => {
  const {otherUserId} = req.body
  pool.query(`DELETE FROM friends WHERE (userid1 = $1 AND userid2 = $2)
                                     OR (userid1 = $2 AND userid2 = $1)`,
  [req.id, otherUserId]);
  return res.status(200).json("friend request succesfully deleted");
});

router.post("/add", tokenAuthentication, async (req, res) => {
  const { searchUsername } = req.body;
  //console.log(searchUsername);

  //get the users id if they exist
  const user = await pool.query("SELECT userid FROM users WHERE username = $1",[searchUsername]);
  if (user.rows.length == 0) {
    return res.status(400).json({error: 'User does not exist'});
  }
  userid = user.rows[0].userid;

  //VALIDATION
  //Check if you are already friends with the user, if a request has already been sent, or if there is an incoming request
  const checkRelationship = await pool.query("SELECT type FROM friends WHERE userid1 = $1 AND userid2 = $2",
  [req.id, userid]);
  //console.log(checkRationship.rows[0]);el
  if (checkRelationship.rows.length == 0) {
    pool.query("INSERT INTO friends (userid1, userid2, type) VALUES ($1, $2, $3), ($4, $5, $6)",
    [req.id, userid, "outgoing", userid, req.id, "incoming"]);
    return res.status(200).json("Friend request sent");
  }
  if (checkRelationship.rows[0].type == "friends") {
    //If you are already friends with the user
    return res.status(400).json({error: 'You are already friends with this user'});
  }
  if (checkRelationship.rows[0].type == "outoing") {
    //If there is already an outgoing request to the user
    return res.status(400).json({error: 'There is already an outgoing request to this user'});
  }
  if (checkRelationship.rows[0].type == "incoming") {
    //If there is already an outgoing request to the user
    return res.status(400).json({error: 'There is already an incoming request from this user'});
  }
});

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

module.exports = router;