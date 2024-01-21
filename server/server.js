const express = require("express");
const cors = require("cors");
const app = express();
const pool = require ("./database")

app.use(cors());
app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const newUser = await pool.query(
      'INSERT INTO Users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)',
      [email, firstname, lastname, password]
    );
    res.send("Success");
  } catch (err) {
    console.error(err.message);
  }
});

//--- FROM EXPRESSJS -----
app.get("/adduser", async (req,res) => { //async - waits for the function to complete before it continues.
  console.log(req.body);
  res.send("Response Received: " + req.body);
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
})
//------------------------