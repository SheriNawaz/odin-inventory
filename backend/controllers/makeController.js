const pool = require('../db');

const createMake = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Make name is required' });
    }

    const result = await pool.query(
      'INSERT INTO car_makes (name) VALUES ($1) RETURNING *',
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMakes = async (req, res) => {
    try {
    const result = await pool.query(`
      SELECT * FROM car_makes
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createMake, getMakes
};