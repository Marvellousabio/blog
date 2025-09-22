const express =require('express');
const morgan=require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRoutes=require('./routes/blogRoute.js')

const  app= express();
//connect to mongo DB
const dbuRI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
mongoose.connect(dbuRI)
  .then((result) => app.listen(PORT,console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log('DB connection error:', err));

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const methodOverride = require('method-override');

// Middleware to override methods using query string (?_method=PUT)
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    //res.send('<p>About Page<p>');
    res.render('about',{title:'About'});
});
app.use('/blogs',blogRoutes);
//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})
