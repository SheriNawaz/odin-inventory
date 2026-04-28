const express = require('express');
const router = express.Router();
const { createModel, getModels, getModelById, deleteModel, updateModel } = require('../controllers/modelController');

// POST /models CREATE
router.post('/', createModel);
//GET /models READ ALL
router.get('/', getModels)
//GET /models/:id READ BY ID
router.get('/:id', getModelById);
//PUT /models/:id UPDATE
router.put('/:id', updateModel)
//DELETE /models/:id DELETE
router.delete('/:id', deleteModel);


module.exports = router;