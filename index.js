const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const loggerMiddleware = require('./middleware/logger');
const indexRouter = require('./routes/index');
const libraryApiRouter = require('./routes/api/library');
const libraryRouter = require('./routes/library');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/api/user', indexRouter);
app.use('/', libraryRouter);
app.use('/api/books', libraryApiRouter);

app.use(errorMiddleware);


app.listen(process.env.PORT || 3000);
