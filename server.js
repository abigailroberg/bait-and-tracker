const path = require('path');
const express = require('express');

const controllers = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// set up handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
})