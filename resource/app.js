import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// routes
import usersRoute from './api/routes/user';
import accountRoute from './api/routes/account';

const app = express();

// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/accounts', accountRoute);

// error handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
  });
});

// port
const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening to port ${port}`); });

export default app;
