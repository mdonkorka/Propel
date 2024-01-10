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

// --- FROM AUTH0 -----
// const { auth } = require('express-openid-connect');

// const config = { 
//   authRequired: false,
//   auth0Logout: true,
//   secret: '25a9183cf2a33653bf76320120bf6251c345fc815bd235a59cbc3004fcb93ce1',
//   baseURL: 'http://localhost:3000',
//   clientID: 'PgFvWNVBJnJ2OhuigJGVWD3ILoXV8Hy2',
//   issuerBaseURL: 'https://dev-w6uiocsk7822rm5n.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
// ---------------------