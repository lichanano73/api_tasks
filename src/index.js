const express = require('express');
const cors = require('cors');

const config = require('./config/config');
const conectDB = require('./config/db_mongo');
const PORT = config.port;
const URI_DB = config.uri_db;

const routerTask = require('./routes/route.tasks');

const app  = express();

// Middleware
app.use(express.json());
app.use(cors());

// Router
app.use('/api/tasks',routerTask);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Proyecto corriendo en http://localhost:${PORT}`);
  conectDB(URI_DB);
})