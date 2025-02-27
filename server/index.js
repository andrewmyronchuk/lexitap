require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const path = require('path');
const router = require('./routes.js');
const connectDB = require('./db/index.js');

const app = express();
connectDB();

// MIDDLEWARE
app.use(express.json());
// COOKIE PARSER
app.use(cookieParser());
// LOGGING
app.use(morgan('dev'));
// API ROUTES
app.use('/api', router);
// STATIC FILES
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
