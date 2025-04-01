import React, { useActionState, useState } from 'react';

const Comments = ({ trackId, songName }) => {
  const [comments, setComments] = useState([]); 

  const [formStatus, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const newComment = formData.get("newComment");
        const response = await fetch(`/api/v1/comments/${trackId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newComment, songName })
        });

        if (!response.ok) throw new Error("Failed to post comment");

        const data = await response.json();
        console.log("Comment added:", data);

        loadComments();

        return 'success';
      } catch (e) {
        console.error("Error posting comment:", e);
        return 'fail';
      }
    },
    'unsubmitted'
  );

  const loadComments = () => {
    fetch(`/api/v1/comments/${trackId}`)
      .then(response => response.json())
      .then(commentsData => {
        if (Array.isArray(commentsData.comments)) { 
          //console.log(commentsData)
          setComments(commentsData.comments);
        } else {
          console.error("Not an array:", commentsData.comments);
        }
      })
      .catch(e => console.error(e));
  };

  // Load comments when the load comment button is clicked
  const handleLoadComments = () => {
    loadComments();
  };

  return (
    <div className="comment-container">
      <form className="comment-input-container" action={formAction}>
        <input
          type="text"
          name="newComment"
          className="comment-input"
          placeholder="Add a comment..."
        />
        <button type="submit" className="submit-comment-btn" disabled={isPending}>
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>

      <button onClick={handleLoadComments} className="load-comments-btn">
        Load Comments
      </button>

      <div className="comments">
        <div>
          {comments.length>0? (
            comments.map((comment) => (
              <div key={comment._id} className='single-comment'>{comment.content}</div>
            ))
          ):(
            <div className='load-comment'>Click the button to load comments</div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Comments;
