import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

import constants from '../../constants';
import dateParser from '../../util-functions/date-parsing.js';

import Loading from '../Loading';

import './index.css';

function Article() {
  let {article_id: articleId} = useParams();
  console.log(articleId);
  
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

          // Append article
          console.log(data.article);

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
          <p className=
              "button__element--gray button__element--grid button__category">
            <span className="button__element--inner-label">Category:</span>
            <span>{article.topic}</span>
          </p>
          <p className="button__element--gray button__element--grid">
            <span className="button__element--inner-label">Author:</span>
            <span>{article.author}</span>
          </p>
          <p className="button__element--gray">
            <span>{dateParser.convertUnixDate(article.created_at)}</span>
          </p>
          <p className="button__votes button__element--gray">
            <img className="button__vote_btn" src='/images/buttons/upvote.svg' />
            <span>{article.votes}</span>
            <img className="button__vote_btn" src='/images/buttons/downvote.svg' />
          </p>
        </div>
        <img className="article-content__img" src={article.article_img_url}></img>
        <p className="article-content__body">{article.body}</p>

        {/* Move to Comments Component */}
        <section className="article-comments-section">
          <h3 className="article-comments__comments_title">Comments ({article.comment_count})</h3>
          <p>This article doesn't contain any comments.</p>
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