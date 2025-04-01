
const setupCollections = database =>{
  let commentsCollection = database.createCollection
  ('Comments', {validator:{
      $jsonSchema:{
          bsonType: 'object',
          required: ['content', 'trackId', 'songName', 'time'],
          properties: {
              conent: {
                  bsonType: 'string',
                  minLength: 3,
                  maxLength: 50
              },
              trackId:{
                bsonType: 'string'
              },
              songName:{
                bsonType: 'string'
              }
          }
      }
  }});

  let likesCollection = database.createCollection
  ('Likes', {validator:{
      $jsonSchema:{
          bsonType: 'object',
          required: ['trackId', 'songName'],
          properties: {
            trackId:{
              bsonType: 'string'
            },
            songName:{
              bsonType: 'string'
            },
            likesNumber: {
              bsonType: 'int',
            }
          }
      }
  }});

  return Promise.all([commentsCollection, likesCollection]);
}

export default setupCollections;