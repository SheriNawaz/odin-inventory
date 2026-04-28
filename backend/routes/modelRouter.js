const express = require('express');
const router = express.Router();
const { createModel, getModels } = require('../controllers/modelController');

// POST /makes
router.post('/', createModel);
//GET /makes
router.get('/', getModels)

module.exports = router;