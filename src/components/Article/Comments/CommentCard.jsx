import axios from 'axios';
import {useContext, useState} from 'react';

import Loading from '../../Loading';
import ErrorOverlay from '../../ErrorOverlay';

import {UserContext} from '../../../contexts/User';

import constants from '../../../constants';

import dateParsing from '../../../util-functions/date-parsing';

import './CommentCard.css';

function CommentCard({comment, setComments}) {
  const {user} = useContext(UserContext);
  const [delBtnDisabled, setDelBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errOverlayMsg, setErrOverlayMsg] = useState(null);

  const handleDeleteCommentClick = (event) => {
    event.preventDefault();

    setDelBtnDisabled(true);
    setIsLoading(true);

    const url = `${constants.COMMENTS_API_URL}/${comment.comment_id}`;

    axios.delete(url)
        .then(() => {
          setComments((currCommentArr) => {
            return currCommentArr.filter(
                (com) => {
                  return (com.comment_id !== comment.comment_id);
                });
          });
        })
        .catch((err) => {
          console.log(err);
          setErrOverlayMsg("Unable to delete comment!");
        })
        .finally(() => {
          setDelBtnDisabled(false);
          setIsLoading(false);
        });
  };

  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <img className="comment-card__avatar" src="/images/avatar/user.svg"/>
        <p className="comment-card__author">{comment.author}</p>
        <p className="comment-card__divider comment-card__element--gray">•</p>
        <p className="comment-card__element--gray">
          {dateParsing.convertUnixDate(comment.created_at)}
        </p>
      </div>

      <p className="comment-card__body">{comment.body}</p>

      <div className="comment-card-footer">
        <p className="comment-card__votes">
          <img className="button__vote_btn" src='/images/buttons/upvote.svg' />
          <span className="comment-card__vote_count">{comment.votes}</span>
          <img className="button__vote_btn" src='/images/buttons/downvote.svg' />
        </p>
        {(user && (user.username === comment.author)) ?
          <button className="comment-delete-btn" disabled={delBtnDisabled} 
              onClick={handleDeleteCommentClick}>
            <img alt="Delete Comment" className="comment-icon" src="/images/buttons/delete.svg" />
          </button>
            :
          null
        }
      </div>

      {(isLoading) ?
          <Loading size="tiny" />
        :
          null
      }

      {errOverlayMsg ? 
          <ErrorOverlay errOverlayMsg={errOverlayMsg} setErrOverlayMsg={setErrOverlayMsg}/> 
        : 
          null
      }      
    </div>
  );
}

export default CommentCard;