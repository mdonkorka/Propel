const {Pool} = require("pg");

//Here we are creating an instance of the pool className with one object. 
//  The one object contains different values
const pool = new Pool({
  user: "postgres",
  password: "Supergiza43!",
  host: "localhost",
  post: "5432",
  database: "propel"
})

module.exports = pool;

// pool
//   .query("SELECT * FROM questionnaire;")
//   .then((response) => {
//     console.log("Database Created");
//     console.log(response.rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   }
//   )

// pool
//   .query("CREATE DATABASE propel;")
  // .then((response) => {
  //   console.log("Database Created");
  //   console.log(response);
  // })
  // .catch((err) => {
  //   console.log(err);
  // }
  // )

