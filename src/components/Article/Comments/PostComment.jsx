import axios from 'axios';
import {useState, useEffect, useContext} from 'react';

import Loading from '../../Loading';

import {UserContext} from '../../../contexts/User';

import constants from '../../../constants';
import validateComment from '../../../validators/comment-validator';

import './PostComment.css';

function PostComment({articleId, setComments}) {
  const [commentText, setCommentText] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displaySuccMsg, setDisplaySuccMsg] = useState(false);

  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log("Mounting PostComment component!");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg(null);

    if (formDisabled)
      return;
    
    setFormDisabled(true);
    setDisplaySuccMsg(false);

    const comment = commentText.trim();

    // Validate comment
    const valCommentObj = validateComment(comment);
    if (!valCommentObj.valid) {
      setErrMsg(valCommentObj.msg);
      setFormDisabled(false);

      return;
    }

    setIsLoading(true);

    // Submit comment
    const url = `${constants.ARTICLES_API_URL}/${articleId}/comments`;
    const reqBody = {username: user.username, body: comment};

    axios.post(url, reqBody)
        .then(({data}) => {
          appendComment(data.comment);

          setCommentText("");
          setDisplaySuccMsg(true);
        })
        .catch((err) => {
          console.log(err);

          setErrMsg("Failed to post comment!");
        })
        .finally(() => {
          setFormDisabled(false);
          setIsLoading(false);
        });
  };

  const appendComment = (comment) => {
    setComments((currComments) => {
      // Append article_id
      if (!comment.article_id)
        comment.article_id = articleId;

      const newComments = [comment, ...currComments];
      
      return newComments;
    });
  };

  const handleCommentBoxInput = (event) => {
    if (event.target.value.length > constants.COMMENT_MAX_LENGTH)
      return;

    setCommentText(event.target.value);
  };

  return (
    <div className="post-comment-section">
      <form onSubmit={handleSubmit} className="post-comment-form">
        {isLoading ?
            <Loading size="small"/>
          :
            null
        }

        {errMsg ?
            <p className="comment-msg comment-msg--error">{errMsg}</p>
          :
            null
        }

        {displaySuccMsg ?
            <p className="comment-msg comment-msg--success">Comment posted successfully!</p>
          :
            null
        }
        
        <textarea 
          className="post-comment-textarea" placeholder="Add a comment..." 
          onChange={handleCommentBoxInput} value={commentText} disabled={formDisabled}
        />
        <button className="default-button" disabled={formDisabled}>Post Comment</button>

      </form>
    </div>
  );
}

export default PostComment;