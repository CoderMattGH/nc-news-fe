import dateParsing from '../../../util-functions/date-parsing';

import './CommentCard.css';

function CommentCard({comment}) {
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
      <p className="comment-card__votes">
        <img className="button__vote_btn" src='/images/buttons/upvote.svg' />
        <span className="comment-card__vote_count">{comment.votes}</span>
        <img className="button__vote_btn" src='/images/buttons/downvote.svg' />
      </p>
    </div>
  );
}

export default CommentCard;