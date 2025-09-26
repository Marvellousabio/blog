const express =require('express');
const morgan=require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const blogRoutes=require('./routes/blogRoute.js')

const  app= express();
//connect to mongo DB
const dbuRI = process.env.DB_URI;

mongoose.connect(dbuRI)
  .then(() => console.log('Mongo DB connected '))
  .catch((err) => console.log('DB connection error:', err));

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});
app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});

module.exports = app; 