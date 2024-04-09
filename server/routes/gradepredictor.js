const express = require("express");
router = express.Router();
const pool = require ("../database");
const dotenv = require('dotenv');
dotenv.config();
const { spawn } = require('child_process');

const app = express();

const tokenAuthentication = require('../middleware/authMiddleware');

const executePython = async (script, args) => {
  const arguments = args.map(arg => arg.toString());

  const py = spawn("python", [script, ...arguments]);

  const result = await new Promise((resolve, reject) => {
      let output;

      // Get output from python script
      py.stdout.on('data', (data) => {
          output = JSON.parse(data);
      });

      //Handle erros
      py.stderr.on("data", (data) => {
          console.error(`[python] Error occured: ${data}`);
          reject(`Error occured in ${script}`);
      });

      py.on("exit", (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve(output);
      });
  });

  return result;
}

router.get('/', tokenAuthentication, async (req, res) => {

  const fetchedUserData = await pool.query(`SELECT (studytime, faliures, absences, lastgrade)
                                      FROM questionnaire
                                      WHERE userid = $1`,
                                    [req.id]);
  
  const userData = fetchedUserData.rows[0].row.slice(1,-1).split(',');
  userDataNumbers = userData.map(num => Number(num))
  console.log(userDataNumbers)

  try {
      const fetchedResult = await executePython('python/gradepredictor.py', userDataNumbers);
      result = fetchedResult
      res.json({ result: result });
  } catch (error) {
      res.status(500).json({ error: error });
  }
});

module.exports = router;