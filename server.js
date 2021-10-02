const express = require('express');
const controllers = require('./controllers/');

// sequelize here
const sequelize = require('./config/connection')

// handlebars module import
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set handlebars as app templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(controllers);

//server connection & encapsulate in db callback here...
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
});