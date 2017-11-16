import { user } from '../controllers';

export default (app) => {
/**
* API routes.
*/

  // base Route
  app.get('/api/v1', (req, res) => {
    res
      .status(200)
      .send({
        message: 'Welcome to the API'
      });
  });

  // signin api route
  app.post('/api/v1/signin', user.signin);

  // get all users api route
  app.get('/api/v1/users', user.getAll);
}