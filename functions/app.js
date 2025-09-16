const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Serve static assets BEFORE routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/exec', express.static(path.join(__dirname, 'exec')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Set up Handlebars view engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Welcome to Calamus Creative Solutions' });
});

app.get('/services', (req, res) => {
  res.render('pages/services', { title: 'Our Services' });
});

app.get('/portfolio', (req, res) => {
  res.render('pages/portfolio', { title: 'Portfolio' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About Us' });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
});

app.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});

app.get('/services/packages', (req, res) => {
  res.render('pages/packages', { title: 'Packages & Pricing' });
});

module.exports = app;
