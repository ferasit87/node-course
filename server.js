const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}` ;
  console.log();
  fs.appendFile('server.log', log + '\n' , (err) => {
    if (err) {
      console.log('unabel to write to fiel');
    }
  });
  next();
});
hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear() ;
});

hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
      pageTitle: "Home" ,
      welcomeMessage : "Welcome Message ",
  });
});
// About Page
app.get('/about', (req, res) => {
  res.render('about.hbs',{
      pageTitle: "About" ,
  });
});
// E404 Page
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Error handeling request"
  });
});
//Running Server
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
