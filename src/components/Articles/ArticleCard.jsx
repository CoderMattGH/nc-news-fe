import {Link} from 'react-router-dom';
import {useContext} from 'react';

import dateParsing from '../../util-functions/date-parsing';

import {UserContext} from '../../contexts/User';

import './ArticleCard.css';

function ArticleCard({article, upDownVoteArticle, setArticles}) {
  const {user} = useContext(UserContext);

  const handleUpVoteClick = (event) => {
    event.preventDefault();

    // Optimistically increment vote count
    incDecArticleVotes(article.article_id, true);

    upDownVoteArticle(article.article_id, 1)
        .then(() => {
          console.log("Upvote successful!");
        })
        .catch((err) => {
          // Decrement vote back to original value
          incDecArticleVotes(article.article_id, false);
        });
  };

  const handleDownVoteClick = (event) => {
    event.preventDefault();

    // Optimistically decrement vote count
    incDecArticleVotes(article.article_id, false);

    upDownVoteArticle(article.article_id, -1)
        .then(() => {
          console.log("Down vote successful!");
        })
        .catch((err) => {
          // Decrement vote back to original value
          incDecArticleVotes(article.article_id, true);
        });
  };

  const incDecArticleVotes = (articleId, incDecBool) => {
    // Optimistically render upvote/downvote
    setArticles((currArticles) => {
      const newArticlesArr = currArticles.map((a) => {
        const tempArt = {...a};

        if(tempArt.article_id === articleId) {
          if (incDecBool)
            tempArt.votes++;
          else
            tempArt.votes--;
        }

        return tempArt;
      });

      return newArticlesArr;
    });
  };

  const preventLinkRedirect = (event) => {
    event.preventDefault();
  };

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
        <p className="button__votes button__element--gray" onClick={preventLinkRedirect} >
          <img
            className="button__vote_btn" onClick={handleUpVoteClick} alt="upvote" 
            src="/images/buttons/upvote.svg" 
          />
          <span>{article.votes}</span>
          <img
            className="button__vote_btn" onClick={handleDownVoteClick} alt="downvote" 
            src="/images/buttons/downvote.svg" 
          />
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