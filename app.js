"use strict";

const express = require("express");
const {google} = require('googleapis');
const calendar = google.calendar('v3');
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

app.get("/getCalendar", async function(req, res) {
  try {
    let options = {
      method: 'GET',
      url: 'https://www.googleapis.com/calendar/v3/calendars/primary'
    };
    await request(options, async function(error, response, body) {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      let resp = JSON.parse(body);
      console.log(resp);
      // if (resp.access_token !== undefined && resp.refresh_token !== undefined) {

      // } else {
      //   throw new Error("Invalid access or refresh tokens returned");
      // }
      res.json({"data": resp});
    });
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