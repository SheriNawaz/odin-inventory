require('dotenv').config();

const express = require('express');
const pool = require('./db');

const makeRouter = require('./routes/makeRouter')
const modelRouter = require('./routes/modelRouter')

const app = express();

app.use(express.json());

app.use('/makes', makeRouter);
app.use('/models', modelRouter);

// app.get('/cars', async (req, res) => {
//   try {
//     const makesResult = await pool.query(`SELECT * FROM car_makes`);
    
//     const modelsResult = await pool.query(`
//       SELECT 
//         car_models.id,
//         car_models.model_name,
//         car_models.price,
//         car_models.stock_quantity,
//         car_makes.name AS make
//       FROM car_models
//       JOIN car_makes ON car_models.make_id = car_makes.id
//     `);
    
//     res.json({
//       makes: makesResult.rows,
//       models: modelsResult.rows
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(3000, () => console.log('Server running'));