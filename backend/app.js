require('dotenv').config();

const express = require('express');
const pool = require('./db');

const cors = require("cors");
const makeRouter = require('./routes/makeRouter')
const modelRouter = require('./routes/modelRouter')

const app = express();
app.use(cors());

app.use(express.json());

app.use('/makes', makeRouter);
app.use('/models', modelRouter);


app.listen(3000, () => console.log('Server running'));