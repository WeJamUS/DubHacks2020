"use strict";

const express = require("express");
const multer = require("multer");
const request = require("request");
const {Pool} = require('pg');
require('dotenv').config();
const app = express();

const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = "Something went wrong on the server, please try again later.";
const pool = new Pool({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: process.env.DATABASE_URL
});

app.get("", async function(req, res) {
  try {

  } catch (error) {
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MSG});
  }
});

// ----------------------- SQL QUERY FUNCTIONS -----------------------

/**
 * Executes the given query with the given parameters
 * @param {String} qry SQL syntax to be executed
 * @param {String[]} param Array of parameters for the query
 */
async function pgQuery(qry, param) {
  let client = await pool.connect();
  try {
    let res = await client.query(qry, param);
    return res.rows;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);