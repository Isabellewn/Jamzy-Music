import database from "../app.js";

const postLikes = async (req, res)=>{
  const { trackId } = req.params;
  let likeDocument ={
    trackId: req.params.trackId,
    songName: req.body.songName,
    likesNumber: 1
  }

  try {
    const track = await database.collection('Likes').findOne({ trackId });
    if (track) {
      await database.collection('Likes').updateOne(
        { trackId },
        { $inc: { likesNumber: 1 } }
      ); 
    } else {
      await database.collection('Likes').insertOne(likeDocument);
    }

    const updatedLike = await database.collection('Likes').findOne({ trackId });
    //console.log(updatedLike)

    res.status(200).json({ 
      message: 'Like added successfully', 
      like: updatedLike
    });

  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: 'Error adding like' });
  }
}

const getLikes = async (req, res)=>{
  const { trackId } = req.params;
  try {
    const likeDoc = await database.collection('Likes').findOne({ trackId });
    //console.log(likeDoc)
    res.status(200).json(likeDoc);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching likes' });
  }

}


export {postLikes, getLikes}