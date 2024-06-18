import { Link } from 'react-router-dom';
import dateParsing from '../../util-functions/date-parsing';

import './ArticleCard.css';

// TODO : Author
function ArticleCard({article}) {
  return (
    <>
      <img alt="Article Image" className="article-card__img" src={article.article_img_url} />
      <h2 className="article-card__title">{article.title}</h2>
      <p className="article-card__desc-summary">
        {(article.body_preview.length >= 410) ?
            article.body_preview.slice(0, 410).trim() + "..."
          : 
            article.body_preview
        }
      </p>
      <div className="article-card__footer">
        <p className="button__votes button__element--gray">
          <img alt="upvote" className="button__vote_btn" src="/images/buttons/upvote.svg" />
          <span>{article.votes}</span>
          <img alt="downvote" className="button__vote_btn" src="/images/buttons/downvote.svg" />
        </p>
        <p className="button__category button__element--gray">{article.topic}</p>
        <p className="article_card__date button__element--gray">
          {dateParsing.convertUnixDate(article.created_at)}
        </p>
        <p className="article_card__comment-count button__element--gray">
          {article.comment_count} comments
        </p>
      </div>
    </>
  );
}

export default ArticleCard;