const mongoose = require('mongoose')
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoute.js');


const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// connect to mongo DB
const dbURI = process.env.DB_URI;
const port = process.env.PORT || 3000;
mongoose.connect(dbURI)
  .then(() => console.log('Mongo DB connected'))
  .catch((err) => console.log('DB connection error:', err));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(port, 'localhost', () => {
    console.log(`listening for requests on port ${port}`)
})

