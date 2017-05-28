'use strict';

const express = require('express');
const path = require('path');
const config = require('config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const index = require('./routes/index.js');
const http = require('http');
const port = process.env.PORT || config.get('port');

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'build/templates'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build'));

app.use('/', index);

// Error handler
app.use(function (err, req, res, next) {

    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
});

app.listen(port, function () {
    console.log(`Running server on port ${port}`);
})
