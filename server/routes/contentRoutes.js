const express = require('express');
const router = express.Router();
const { getAllContent, getContentById, createContent } = require('../controllers/contentController');

router.get('/', getAllContent);
router.get('/:id', getContentById);
router.post('/', createContent);

module.exports = router;
