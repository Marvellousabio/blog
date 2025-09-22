const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

// Blog Routes
router.get('/', blogController.blog_index);
router.get('/create', blogController.blog_create_get);
router.post('/', blogController.blog_create_post);

// ✅ Edit routes (corrected)
router.get('/:id/edit', blogController.blog_edit_form);
router.put('/:id', blogController.blog_update);

router.get('/:id', blogController.blog_detail);
router.delete('/:id', blogController.blog_delete);

module.exports = router;
