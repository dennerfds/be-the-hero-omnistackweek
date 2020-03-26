const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

//app.use(cors);
app.use(express.json()); // When sending a request, all the body data will be formatted into json
app.use(routes);
app.listen(3333);