const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const formData = require("express-form-data");

const indexRouter = require('./routes/index');
const libraryRouter = require('./routes/library');

const app = express();

// app.use(formData.parse());
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/books', libraryRouter);

app.listen(3000);
