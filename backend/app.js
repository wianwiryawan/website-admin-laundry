require('@dotenvx/dotenvx').config()
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./database/init.js');

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send({ message: 'Pong!' });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Express!' });
});

app.get('/users', async (req, res) => {
    const schema = 'data';
    const table = 'users';
    const result = await db.query(`SELECT * FROM ${schema}.${table}`);
    res.json(result.rows);
})

const PORT = process.env.NODE_PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
