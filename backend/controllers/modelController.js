const pool = require('../db');

//CREATE 
const createModel = async (req, res) => {
  try {
    const { model_name, price, stock_quantity, make_id } = req.body;

    if (!model_name || !price || !stock_quantity || !make_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO car_models (model_name, price, stock_quantity, make_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [model_name, price, stock_quantity, make_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//READ
const getModels = async (req, res) => {
    try {
    const result = await pool.query(`
      SELECT * FROM car_models
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// READ BY ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM car_models WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//UPDATE
const updateModel = async (req, res) => {
    try {
      const { id } = req.params;
      const { model_name, price, stock_quantity, make_id } = req.body;

      if (!model_name || !price || !stock_quantity || !make_id) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const result = await pool.query(
        'UPDATE car_models SET model_name=$1, price=$2, stock_quantity=$3, make_id=$4 WHERE id=$5 RETURNING *',
        [model_name, price, stock_quantity, make_id, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Model not found' });
      }

      res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//DELETE
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM car_models WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json({ message: 'Model deleted', model: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createModel, getModels, getModelById, deleteModel, updateModel
};