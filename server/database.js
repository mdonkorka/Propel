const {Pool} = require("pg");

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

