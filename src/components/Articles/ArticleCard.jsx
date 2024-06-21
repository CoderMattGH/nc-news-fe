import DEBUG from '../../constants/debug';

import {useState} from 'react';
import dateParsing from '../../util-functions/date-parsing';

import ErrorOverlay from '../ErrorOverlay';

import constants from '../../constants';

import './ArticleCard.css';

function ArticleCard({article, upDownVoteArticle, setArticles}) {
  const [errOverlayMsg, setErrOverlayMsg] = useState(null);

  const handleUpDownVoteClick = (event, increment) => {
    event.preventDefault();

    // Optimistically decrement vote count.
    incDecArticleVotes(article.article_id, increment);

    upDownVoteArticle(article.article_id, increment)
        .then(() => {
          if (DEBUG)
            console.log("Vote successful!");
        })
        .catch((err) => {
          if (DEBUG)
            console.log(err);

          let errMsg;
          if (err.message === "USER_NOT_LOGGED_IN")
            errMsg = constants.ERR_MSG_NOT_LOGGED_IN;
          else if (err.message === "USER_ALREADY_VOTED")
            errMsg = null;
          else 
            errMsg = "Unable to register article vote!";

          setErrOverlayMsg(errMsg);

          // Decrement vote back to original value.
          incDecArticleVotes(article.article_id, increment * -1);
        });
  };  

  const incDecArticleVotes = (articleId, increment) => {
    setArticles((currArticles) => {
      const newArticlesArr = currArticles.map((a) => {
        const tempArt = {...a};

        if(tempArt.article_id === articleId)
          tempArt.votes += increment;

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
        <p className="button__votes article-card__votes-btn button__element--gray" 
            onClick={preventLinkRedirect} >
          <img
            className="button__vote_btn" onClick={(e) => {handleUpDownVoteClick(e, 1)}} alt="upvote" 
            src="/images/buttons/upvote.svg" 
          />
          <span>{article.votes}</span>
          <img
            className="button__vote_btn" onClick={(e) => {handleUpDownVoteClick(e, -1)}} 
            alt="downvote" src="/images/buttons/downvote.svg" 
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

      {errOverlayMsg ? 
          <ErrorOverlay errOverlayMsg={errOverlayMsg} setErrOverlayMsg={setErrOverlayMsg}/> 
        : 
          null
      }
    </>
  );
}

export default ArticleCard;