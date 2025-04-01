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

// //user login
// app.post('/api/v1/login', async (req, res) => {
//   try {
//     const { userEmail } = req.body;
//     if (!userEmail) {
//       return res.status(400).json({ error: "Email is required" });
//     }
//     const existingUser = await database.collection('user').findOne({ userEmail });
//     if (existingUser) {
//       return res.json({ message: "User already exists", user: existingUser });
//     }
//     let userDocument = {
//       userEmail,
//       myLikes: [],
//       comments: []
//     };
//     await database.collection('user').insertOne(userDocument);
//     res.json({ message: "User created successfully", user: userDocument });
//   } catch (error) {
//     console.error("Error inserting user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

export default database;



