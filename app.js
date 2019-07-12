const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');
const database = require('./config/dbUtil');

const session = require('express-session');
database
  .connectionToServer()
  .then(result => {
    const routes = require('./routes');

    app.set('views', path.join(__dirname, 'views'));

    app.engine(
      'hbs',
      hbs({
        extname: 'hbs',
        partialsDir: path.join(__dirname, '/views/partials/')
      })
    );
    app.set('view engine', 'hbs');

    app.use(express.static('public'));
    app.use(
      session({
        secret: 'secret key',
        resave: true,
        saveUninitialized: false
      })
    );
    app.use('/', routes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log('server is listening on port ' + PORT));
  })
  .catch(err => {
    throw err;
  });
