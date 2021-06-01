const path = require('path');
const result = require('dotenv').config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
  throw new Error(result.error);
}

const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const app = express();
const pino = require('pino-http');

app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(express.json());
app.use(cors());

app.use('/users', require('./routes/users'));
app.use('/pets/:petId', require('./routes/petActions'));
app.use('/pets', require('./routes/pets'));
app.get('/', (req, res, next) => {
  res.send("Hello WOrld!");
});

const host = process.env.HOST;
const port = +process.env.PORT;

postgrator.migrate().then((result) => {
  console.log(`migrated db successfully:`, result);
  app.listen(port, host, () => {
    console.log(`server is listening at http://${host}:${port}`);
  });
}).catch(error => console.error(error));