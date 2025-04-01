import express from 'express';
import { client, connection } from './database.js';
import setupCollections from './collections.js';
import router from './routes/index.js';

const app = express();

let server;
connection
  .then(()=>setupCollections(database)) 
  .then(() => {
    console.log("Successful connection to database!");
    server = app.listen(3000, () => console.log('Server listening.'));
  })
  .catch(e => console.error(e));

const database = client.db('Jamzy');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/v1', router);

export default database;



