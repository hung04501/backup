// https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');


// Get our API routes
// const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/apps')));

// Set our api routes
// app.use('/api', api);

// Directory listing for root
app.use(serveIndex(path.join(__dirname, 'dist/apps')));

// Catch all other routes and return the index file
app.use('/frmd', express.static('./dist/apps/frmd'), (req, res, next)=> {
  res.sendFile(__dirname + '/dist/apps/frmd/index.html')
});
app.use('/todo', express.static('./dist/apps/todo'), (req, res, next)=> {
  res.sendFile(__dirname + '/dist/apps/todo/index.html')
});
app.use('/user', express.static('./dist/apps/user'), (req, res, next)=> {
  res.sendFile(__dirname + '/dist/apps/user/index.html')
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5555';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on http://localhost:${port}`));
