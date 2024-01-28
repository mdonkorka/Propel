const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

const userRoute = require('./routes/auth');

app.use('/auth', userRoute);

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
})