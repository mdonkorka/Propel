const express = require("express");
const cors = require("cors");
const app = express();
const pool = require ("./database")

app.use(cors());
app.use(express.json())


//await - pauses the execution of the async function until the Promise is settled.
//      - waits for that very function to finish

//--- FROM EXPRESSJS -----
app.get("/adduser", async (req,res) => { //async - waits for the function to complete before it continues.
  console.log(req.body);
  res.send("Response Received: " + req.body);
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
})
//------------------------