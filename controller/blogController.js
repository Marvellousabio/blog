const { render } = require('ejs');

const Blog = require('../models/blog.js');

// Show all blogs
const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index', { title: "All Blogs", blogs: result });
    })
    .catch(err => {
      console.log('Error fetching blogs:', err);
      res.status(500).render('500', { title: 'Server Error' });
    });
};

// Show blog details
const blog_detail = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      if (result) {
        res.render('blogs/details', { blog: result, title: result.title });
      } else {
        res.status(404).render('404', { title: 'Blog not found' });
      }
    })
    .catch(err => {
      console.log('Error fetching blog detail:', err);
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

// Show create form
const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new Blog' });
};

// Handle blog creation
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log('Error creating blog:', err);
      res.status(500).render('500', { title: 'Blog Creation Failed' });
    });
};

const blog_edit_form = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(blog => {
      if (blog) {
        res.render('blogs/edit', { blog, title: 'Edit Blog' });
      } else {
        res.status(404).render('404', { title: 'Blog not found' });
      }
    })
    .catch(err => {
      console.log('Error fetching blog to edit:', err);
      res.status(500).render('500', { title: 'Server Error' });
    });
};

// Handle blog update
const blog_update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Blog.findByIdAndUpdate(id, updatedData, { new: true })
    .then(result => {
      if (result) {
        res.redirect(`/blogs/${id}`);
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    })
    .catch(err => {
      console.log('Error updating blog:', err);
      res.status(500).json({ error: 'Update failed' });
    });
};



// Handle blog deletion
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.json({ redirect: '/blogs' });
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    })
    .catch(err => {
      console.log('Error deleting blog:', err);
      res.status(500).json({ error: 'Deletion failed' });
    });
};


// Export all controllers
module.exports = {
  blog_index,
  blog_detail,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_update,
  blog_edit_form,
};
