import {useContext} from 'react';
import dateParsing from '../../../util-functions/date-parsing';

import {UserContext} from '../../../contexts/User';

import './CommentCard.css';

function CommentCard({comment}) {
  const {user} = useContext(UserContext);

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
    
        {(user.username === comment.author) ?
          <button className="comment-delete-btn">
            <img alt="Delete Comment "className="comment-icon" src="/images/buttons/delete.svg" />
          </button>
            :
          null
        }
      </div>
    </div>
  );
}

export default CommentCard;