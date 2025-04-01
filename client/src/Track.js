import { FaHeart, FaRegHeart, FaComment, FaRegComment } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Comments from './Comments';

const Track = ({ trackId, songName, singerName, year }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const fetchLikes = ()=>{
    fetch(`/api/v1/likes/${trackId}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data && typeof data.likesNumber === 'number') {
          setLikes(data.likesNumber);
        } else {
          setLikes(0); 
        }
      })
      .catch(error => console.error('Error fetching likes:', error)); 
  }

  useEffect(() => {
    fetchLikes()
  }, [trackId]);


  const handleLikeClick = () => {
    setIsLiked(true);
    fetch(`/api/v1/likes/${trackId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId, songName, like: 1 }),
    }).then(response => response.json())
    .then(data =>{
      console.log(data)
      fetchLikes()
    })
    
  };

  const handleCommentClick = () => {
    setShowComment(!showComment);
  };

  return (
    <div className="track-container">
      <div className="track-info">
        <div className="track-text">
          <div className="song-name">{songName} | {year}</div>
          <div className="singer-name">{singerName}</div>
        </div>
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="300"
          height="80"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      
      <div className="track-actions">
        <button className="action-btn like-btn" onClick={handleLikeClick}>
          {isLiked ? <FaHeart color="#ff6bff" /> : <FaRegHeart />} <span>{likes}</span>
        </button>

        <button className="action-btn comment-btn" onClick={handleCommentClick}>
          {showComment ? <FaComment color="#ff6bff" /> : <FaRegComment />}
        </button>

        {showComment && <Comments trackId={trackId} songName={songName} />}
      </div>
    </div>
  );
}

export default Track;
