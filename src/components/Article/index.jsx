import DEBUG from '../../constants/debug';

import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

import constants from '../../constants';
import dateParser from '../../util-functions/date-parsing.js';

import Comments from './Comments';
import Loading from '../Loading';
import ErrorOverlay from '../ErrorOverlay';

import './index.css';

function Article({upDownVoteArticle}) {
  const {article_id: articleId} = useParams();
  
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  
  const [errOverlayMsg, setErrOverlayMsg] = useState(null);

  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  useEffect(() => {
    if (DEBUG)
      console.log("Mounting Article component!");

    abortController.current = new AbortController();    

    setArticle(null);
    setErrMsg(null);

    fetchPopulateArticle(articleId, abortController.current);

    return () => {
      abortController.current.abort();
    };
  }, []);

  const handleUpDownVoteClick = (event, increment) => {
    event.preventDefault();

    // Optimistically render downvote.
    incDecArticleVotes(increment);    

    upDownVoteArticle(article.article_id, increment)
        .then(() => {
          // Success
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
    if (DEBUG)
      console.log(`Fetching Article where article_id: ${articleId}`);

    currentReqCount.current++;
    setIsLoading(true);
    setErrMsg(null);

    const url = `${constants.ARTICLES_API_URL}/${articleId}`;

    const axOptions = {
      signal: abortController.signal
    };

    axios.get(url, axOptions)
        .then(({data}) => {
          if (DEBUG)
            console.log("Successfully fetched article!");

          setErrMsg(null);

          setArticle(data.article);
        })
        .catch((err) => {
          if (DEBUG)
            console.log(err);
          
          if (err.code && err.code === "ERR_NETWORK") {
            setErrMsg("A network error occurred!");
          }
          else if (err.response && err.response.status) {
            if (err.response.status === 404)
              setErrMsg("Article not found!");
            else if (err.response.status === 400)
              setErrMsg("An unknown error occurred!");
            else
              setErrMsg("An unknown error occurred!");  
          }
          else {
            setErrMsg("An unknown error occurred!");
          }
        })
        .finally(() => {
          currentReqCount.current--;

          if (!currentReqCount.current)
            setIsLoading(false);
        });
  };

  let articleBody;
  if (errMsg) {
    articleBody = (
      <div className="err-msg-default-container">
        <img className="err-msg-default-img" src="/images/logo_sad.svg" />
        <p className="err-msg-default">{errMsg}</p>
      </div>
    );
  }
  else if (!article) {
    articleBody = (<p className="no-articles-found">No article found!</p>);
  } 
  else {
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
          <p className="button__element--gray article-bar-button--grid">
            <span className="button__element--inner-label">Posted:</span>
            <span>{dateParser.convertUnixDate(article.created_at)}</span>
          </p>
          <p className=
              "button__element--gray article-bar-button--grid button__category">
            <span className="button__element--inner-label">Category:</span>
            <span>{article.topic}</span>
          </p>
          <p className="button__element--gray article-bar-button--grid">
            <span className="button__element--inner-label">Author:</span>
            <span>{article.author}</span>
          </p>
        </div>
        <img className="article-content__img" src={article.article_img_url}></img>
        <p className="article-content__body">{article.body}</p>

        <section className="article-comments-section">
          <Comments article={article} />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="content-section">
        {isLoading ? 
            <Loading />
          :
            <div className="article-content">{articleBody}</div>
        }
      </section>

      {errOverlayMsg ? 
          <ErrorOverlay errOverlayMsg={errOverlayMsg} setErrOverlayMsg={setErrOverlayMsg} /> 
        : 
          null
      }      
    </>
  );
}

export default Article;