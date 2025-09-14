app.get('/portfolio', (req, res) => {
  res.render('pages/portfolio');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});
