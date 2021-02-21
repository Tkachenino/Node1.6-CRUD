const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const loggerMiddleware = require('./middleware/logger');
const indexRouter = require('./routes/index');
const libraryRouter = require('./routes/library');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/api/user', indexRouter);
app.use('/api/books', libraryRouter);

app.use(errorMiddleware);


app.listen(process.env.PORT || 3000);
