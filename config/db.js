const mysql = require("mysql2");
  
const pool = mysql.createPool({
	host: "localhost",
    user: "footbet",
    database: "footbet",
    password: "SMobxaub6Y8v7tYl"
});

module.exports = pool;