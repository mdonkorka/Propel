const express = require("express");
router = express.Router();
const pool = require ("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.post("/save", tokenAuthentication, async (req, res) => {
  try {
    const { attendance, absences, faliures, studytime, lastgrade,
      app1Name, app1UseCase, app1Link,
      app2Name, app2UseCase, app2Link,
      app3Name, app3UseCase, app3Link } = req.body;

    //add a new entry to the questionnaire table
    const newQuestionnaire = await pool.query(
      'INSERT INTO questionnaire (userId, attendance, absences, faliures, studytime, lastgrade) VALUES ($1, $2, $3, $4, $5, $6)',
      [req.id, attendance, absences, faliures, studytime, lastgrade]
    );

    //add a new entry to the apps table
    const newApps = await pool.query(
      'INSERT INTO apps (name, usecase, link) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9) RETURNING appid',
      [app1Name, app1UseCase, app1Link, app2Name, app2UseCase, app2Link, app3Name, app3UseCase, app3Link]
    );
    
    const app1id = newApps.rows[0].appid;
    const app2id = newApps.rows[1].appid;
    const app3id = newApps.rows[2].appid;

    //add new entries to the topthreeapps table
    const newTopThreeApps = await pool.query(
      'INSERT INTO topthreeapps (userid, appid) VALUES ($1, $2), ($3, $4), ($5, $6)',
      [req.id, app1id, req.id, app2id, req.id, app3id]
    );

    res.status(200).json({message: 'Questionnare entry successfully added to the database'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.get("/getData", tokenAuthentication, async (req, res) => {
  try {
    const academicData = await pool.query(
      'SELECT attendance, absences, faliures, studytime, lastgrade FROM questionnaire WHERE userid = $1 LIMIT 1',
      [req.id]
    );

    const topThreeAppsData = await pool.query(
      'SELECT name, usecase, link FROM apps WHERE appid IN (SELECT appid FROM topthreeapps WHERE userid = $1)',
      [req.id]
    );



    res.status(200).json({academicData: academicData.rows[0], topThreeAppsData: topThreeAppsData});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;