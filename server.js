const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile(__dirname + '/logs/server.log', log + '\n', (err) => {
        if (err)
        {
            console.log('Unable to append to file');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintanence.hbs', {
        pageTitle : 'The site is under maintanence',
        welcomeMessage : 'We\'ll get back soon!'
    })
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'Hey Sathish! Welcome to the Home Page'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});

app.listen(3000, () => {
    console.log('Server is up for port 3000');
});
