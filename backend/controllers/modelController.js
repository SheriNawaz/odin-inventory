const pool = require('../db');

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


module.exports = {
  createModel, getModels
};