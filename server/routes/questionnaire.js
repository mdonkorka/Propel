const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();

const tokenAuthentication = require('../middleware/authMiddleware');

router.post("/save", tokenAuthentication, async (req, res) => {

  const { attendance, absences, faliures, studytime, lastgrade,
    app1Name, app1UseCase, app1Link,
    app2Name, app2UseCase, app2Link,
    app3Name, app3UseCase, app3Link } = req.body;

  try {
    const academicDataCheck = await pool.query("SELECT * FROM questionnaire WHERE userid = $1",[req.id]);
    if (academicDataCheck.rows.length > 0) {
      //update entry in the questionnaire table
      pool.query(
        `UPDATE questionnaire 
        SET attendance = $2, absences = $3, faliures = $4, studytime = $5, lastgrade = $6
        WHERE userId = $1`,
        [req.id, attendance, absences, faliures, studytime, lastgrade]
      );
    } else {
      //add a new entry to the questionnaire table
      const newQuestionnaire = await pool.query(
        'INSERT INTO questionnaire (userId, attendance, absences, faliures, studytime, lastgrade) VALUES ($1, $2, $3, $4, $5, $6)',
        [req.id, attendance, absences, faliures, studytime, lastgrade]
      );
    }

    const topThreeAppsCheck = await pool.query(`SELECT * FROM topthreeapps WHERE userid = $1 AND number = $2`,
    [req.id, 1]);
    if (topThreeAppsCheck.rows.length > 0) {
      //update the first topthreeapp if it exists
      pool.query(
        `UPDATE topthreeapps SET name = $3, usecase = $4, link = $5 WHERE userId = $1 AND number = $2`,
        [req.id, 1, app1Name, app1UseCase, app1Link]
      );
    } else {
      //insert the first top three app if it doesn't exist
      pool.query(
          'INSERT INTO topthreeapps (userid, number, name, usecase, link) VALUES ($1, $2, $3, $4, $5)',
          [req.id, 1, app1Name, app1UseCase, app1Link]
        );
    }

    const topThreeAppsCheck2 = await pool.query(`SELECT * FROM topthreeapps WHERE userid = $1 AND number = $2`,
    [req.id, 2]);
    if (topThreeAppsCheck2.rows.length > 0) {
      //update the second topthreeapp if it exists
      pool.query(
        `UPDATE topthreeapps SET name = $3, usecase = $4, link = $5 WHERE userId = $1 AND number = $2`,
        [req.id, 2, app2Name, app2UseCase, app2Link]
      );
    } else {
      //update the second topthreeapp if it doesn't exist
      pool.query(
          'INSERT INTO topthreeapps (userid, number, name, usecase, link) VALUES ($1, $2, $3, $4, $5)',
          [req.id, 2, app2Name, app2UseCase, app2Link]
        );
    }

    const topThreeAppsCheck3 = await pool.query(`SELECT * FROM topthreeapps WHERE userid = $1 AND number = $2`,
    [req.id, 3]);
    if (topThreeAppsCheck3.rows.length > 0) {
      //update the third topthreeapp if it exists
      pool.query(
        `UPDATE topthreeapps SET name = $3, usecase = $4, link = $5 WHERE userId = $1 AND number = $2`,
        [req.id, 3, app3Name, app3UseCase, app3Link]
      );
    } else {
      //update the third topthreeapp if it doesn't exist
      pool.query(
          'INSERT INTO topthreeapps (userid, number, name, usecase, link) VALUES ($1, $2, $3, $4, $5)',
          [req.id, 3, app3Name, app3UseCase, app3Link]
        );
    }
    
    res.status(200).json({message: 'Questionnare entry successfully added to the database'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});


//get the questionnaire data to fill the page
router.get("/getData", tokenAuthentication, async (req, res) => {
  try {
    const academicData = await pool.query(
      'SELECT attendance, absences, faliures, studytime, lastgrade FROM questionnaire WHERE userid = $1 LIMIT 1',
      [req.id]
    );

    const topThreeAppsData = await pool.query(
      'SELECT number, name, usecase, link FROM topthreeapps WHERE userid = $1',
      [req.id]
    );

    res.status(200).json({academicData: academicData.rows[0], topThreeAppsData: topThreeAppsData});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;