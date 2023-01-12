// import mysql
const mysql = require("mysql");

// import dotenv dan jalankan method config
require("dotenv").config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// update konfigurasi database dari file .env
const db = mysql.createConnection({
  host: DB_HOST || "localhost",
  user: DB_USERNAME || "root",
  password: DB_PASSWORD || "",
  database: DB_DATABASE || "laravel_restful_api_covid",
});

/**
 * Connect ke database menggunakan method connect.
 * Menerima parameter callback
 */
db.connect((err) => {
  if (err) {
    console.log("Error connecting " + err.stack);
    return;
  } else {
    console.log("Connected to database");
    return;
  }
});

module.exports = db;