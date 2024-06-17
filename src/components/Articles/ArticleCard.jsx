import './ArticleCard.css';

import dateParsing from '../../util-functions/date-parsing';

// TODO :Author
function ArticleCard({article}) {
  return (
    <>
      <img className="article-card__img" src={article.article_img_url} />
      <h2 className="article-card__title">{article.title}</h2>
      <p className="article-card__desc-summary">
        {(article.body_preview.length >= 410) ?
            article.body_preview.slice(0, 410).trim() + "..."
          : 
            article.body_preview
        }
      </p>
      <div className="article-card__footer">
        <p className="article-card__votes article-card__element--gray">
          <img className="article-card__vote_btn" src="./images/buttons/upvote.svg" />
          <span className="article-card__vote_cnt">{article.votes}</span>
          <img className="article-card__vote_btn" src="./images/buttons/downvote.svg" />
        </p>
        <p className="article-card__category article-card__element--gray">{article.topic}</p>
        <p className="article_card__date article-card__element--gray">
          {dateParsing.convertUnixDate(article.created_at)}
        </p>
        <p className="article_card__comment-count article-card__element--gray">
          {article.comment_count} comments
        </p>
      </div>
    </>
  );
}

export default ArticleCard;