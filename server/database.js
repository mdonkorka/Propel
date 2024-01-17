const {Pool} = require("pg");

//Here we are creating an instance of the pool class with one object. 
//  The one object contains different values
const pool = new Pool({
  user: "postgres",
  password: "Supergiza43!",
  host: "localhost",
  post: "5432",
  database: ""
})

module.exports = pool;

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

