const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.use((req, res, next)=>{
  var now= new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log(err);
    }
  });
  console.log(log);
  next();
});

app.use((req, res , next)=>{
  res.render('maintanence.hbs');
});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.set('viewing engine', 'hbs');
app.get('/', (req, res)=> {
  res.render('home.hbs',{
    name : 'anurag',
    welcome : 'hello!!! welcome to out home page'
  });
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    PageTitle : 'About Page is here',
    Content : 'hello there this is me'
  });
});



app.get('/bad', (req, res)=>{
  res.send('bad request');
});

app.listen(port, ()=>{
  console.log('server is up at port '+port);
});
