const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

//middleare
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());

//routes
const authRoute = require('./routes/auth');
const questionnaireRoute = require('./routes/questionnaire');
const friendsRoute = require('./routes/friends');
const graphRoute = require('./routes/graph')

app.use('/auth', authRoute);
app.use('/questionnaire', questionnaireRoute);
app.use('/friends', friendsRoute);
app.use('/graph', graphRoute);



app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
})