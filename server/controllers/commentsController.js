import database from "../app.js";

const postComments = async (req, res)=>{
  if(res.locals.errors.length !== 0){
    res.status(422).json({errors: res.locals.errors})
  }else{
    try {
      let commentDocument = {
        content: req.body.newComment,
        trackId: req.params.trackId,
        songName: req.body.songName,
        time: new Date().toISOString(),
        
      };
      console.log("Saving comment:", commentDocument);
      await database.collection('Comments').insertOne(commentDocument);
      res.status(201).json({ message: "Comment added successfully", comment: commentDocument });
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const getComments = async (req, res)=>{
  try {
    const { trackId } = req.params;
    const comments = await database.collection('Comments').find({ trackId }).toArray();
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export {postComments, getComments}