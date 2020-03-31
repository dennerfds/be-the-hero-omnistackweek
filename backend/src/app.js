const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json()); // When sending a request, all the body data will be formatted into json
app.use(routes);
app.use(errors()); // Used to avoid request status code 500 and format the message into json

module.exports = app;