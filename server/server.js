const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from http://localhost:3000
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies) to be sent
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With'); // Allow specific headers
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE'); // Allow specific HTTP methods
  next();
});

// Your routes and other middleware...

const authRoute = require('./routes/auth');
const questionnaireRoute = require('./routes/questionnaire');

app.use('/auth', authRoute);
app.use('/questionnaire', questionnaireRoute);


app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
})