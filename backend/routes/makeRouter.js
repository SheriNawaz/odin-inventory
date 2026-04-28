const express = require('express');
const router = express.Router();
const { createMake, getMakes } = require('../controllers/makeController');

// POST /makes
router.post('/', createMake);

// GET /makes
router.get('/', getMakes);

module.exports = router;