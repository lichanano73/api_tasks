const express = require('express');
const cors = require('cors');

const config = require('./config/config');
const conectDB = require('./config/db_mongo');
const PORT = config.port;
const URI_DB = config.uri_db;

const apiRouter = require('./routes/route.api');

const app  = express();

// Middleware
app.use(express.json());
app.use(cors());

// Router
app.use('/api',apiRouter);

app.get('/', (req, res) => {
  return res.status(200).json({
    mensaje: 'Hello Word! Test Run!'
  });
})

app.listen(PORT, () => {
  console.log(`Proyecto corriendo en http://localhost:${PORT}`);
  conectDB(URI_DB);
})