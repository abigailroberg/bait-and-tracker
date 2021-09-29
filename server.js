const express = require('express');
const controllers = require('./controllers/');
//sequalize here
//handlebars module import
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = proces.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set handlebars as app templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//routes
app.use(controllers);

//server connection & encapsulate in db callback here...
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
