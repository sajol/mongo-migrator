require('./model/database');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const courseRouter = require('./routes/course');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/course', courseRouter);
