import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

import constants from '../../constants';
import dateParser from '../../util-functions/date-parsing.js';

import Comments from './Comments/';
import Loading from '../Loading';

import './index.css';

function Article({upDownVoteArticle, setErrOverlayMsg}) {
  let {article_id: articleId} = useParams();
  
  let [article, setArticle] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  // On component mount
  useEffect(() => {
    console.log("Mounting Article component!");
    abortController.current = new AbortController();    

    setArticle(null);

    fetchPopulateArticle(articleId, abortController.current);

    return () => {
      abortController.current.abort();
    };
  }, []);

  const handleUpDownVoteClick = (event, increment) => {
    event.preventDefault();

    // Optimistically render downvote
    incDecArticleVotes(increment);    

    upDownVoteArticle(article.article_id, increment)
        .then(() => {
          // Success
        })
        .catch(() => {
          incDecArticleVotes(increment * -1);
        });    
  };

  const incDecArticleVotes = (increment) => {
    setArticle((currArtObj) => {
      const newArtObj = {...currArtObj};

      newArtObj.votes += increment;

      return newArtObj;
    });
  };

  const fetchPopulateArticle = (articleId, abortController) => {
    console.log(`Fetching Article where article_id: ${articleId}`);

    currentReqCount.current++;
    setIsLoading(true);

    const url = `${constants.ARTICLE_BASE_API_URL}${articleId}`;

    const axOptions = {
      signal: abortController.signal
    };

    axios.get(url, axOptions)
        .then(({data}) => {
          console.log("Successfully fetched article!");

          setArticle(data.article);
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR: Unable to fetch article!");
        })
        .finally(() => {
          currentReqCount.current--;

          if (!currentReqCount.current)
            setIsLoading(false);
        });
  };

  let articleBody;
  if (!article) {
    articleBody = (<p className="no-articles-found">No article found!</p>);
  } else {
    articleBody = (
      <>
        <h2 className="article-content__title">{article.title}</h2>
        <div className="article-bar">
          <p className="button__votes button__element--gray">
            <img 
              className="button__vote_btn" onClick={(e) => handleUpDownVoteClick(e, 1)} 
              src='/images/buttons/upvote.svg' 
            />
            <span>{article.votes}</span>
            <img 
              className="button__vote_btn" onClick={(e) => handleUpDownVoteClick(e, -1)} 
              src='/images/buttons/downvote.svg' 
            />
          </p>
          <p className="button__element--gray button__element--grid">
            <span className="button__element--inner-label">Posted:</span>
            <span>{dateParser.convertUnixDate(article.created_at)}</span>
          </p>
          <p className=
              "button__element--gray button__element--grid button__category">
            <span className="button__element--inner-label">Category:</span>
            <span>{article.topic}</span>
          </p>
          <p className="button__element--gray button__element--grid">
            <span className="button__element--inner-label">Author:</span>
            <span>{article.author}</span>
          </p>
        </div>
        <img className="article-content__img" src={article.article_img_url}></img>
        <p className="article-content__body">{article.body}</p>

        <section className="article-comments-section">
          <Comments article={article} setErrOverlayMsg={setErrOverlayMsg} />
        </section>
      </>
    );
  }

  return (
    <section className="content-section">
      {isLoading ? 
          <Loading />
        :
          <div className="article-content">
            {articleBody}
          </div>
      }
    </section>
  );
}

export default Article;