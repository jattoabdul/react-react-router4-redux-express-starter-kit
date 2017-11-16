import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './api/routers';

// Set up the express app
const app = express();

// instantiate an process env variable
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  // for serving static react client app on heroku or remote host
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));
} else {
  // for serving static react client app on server localhost:port
  app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
}

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API routes called here.
*/
routes(app);

module.exports = app;
