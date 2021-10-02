const express = require('express');
const controllers = require('./controllers/');
const session = require('express-session');

// sequelize here
const sequelize = require('./config/connection')
const sequelizeStore = require('connect-session-sequelize')(session.Store);

// handlebars module import
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

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