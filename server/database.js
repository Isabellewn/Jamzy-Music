import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION, {
  serverApi:{
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
})

process.on('SIGINT', ()=>{
  client.close();
  console.log("closed database connection!");
  process.exit(1);
})

let connection = client.connect();

export { client, connection };