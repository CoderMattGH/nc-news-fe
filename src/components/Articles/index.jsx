import DEBUG from '../../constants/debug';

import axios from 'axios';
import {useState,useEffect, useRef} from 'react';
import {useSearchParams, Link} from 'react-router-dom';

import constants from '../../constants';

import FilterBar from './FilterBar';
import ArticleCard from './ArticleCard';
import Loading from '../Loading';

import './index.css';

function Articles({upDownVoteArticle}) {
  const RESULT_LIMIT = 10;

  let [searchParams, setSearchParams] = useSearchParams();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  // Reference to last ArticleCard for infinite scrolling.
  const lastCardRef = useRef(null);

  const pageRef = useRef(null);
  const totalArticleCount = useRef(null);
  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  useEffect(() => {
    if (DEBUG)
      console.log("In Articles useEffect() [searchParams]");

    abortController.current = new AbortController();

    pageRef.current = 1;
    setArticles([]);

    const topicParam = searchParams.get("topic");
    const sortByParam = searchParams.get("sort_by");
    const orderParam = searchParams.get("order");
    const searchParam = searchParams.get("search");

    if (DEBUG)
      console.log(`Params: ${topicParam}, ${sortByParam}, ${orderParam}, ${searchParam}`);

    fetchAppendArticles(pageRef.current, abortController.current, topicParam, 
        sortByParam, orderParam, searchParam);

    return () => {
      abortController.current.abort();
    };
  }, [searchParams]);

  useEffect(() => {
    if (DEBUG)
      console.log("In Article useEffect() [articles]");

    // Add IntersectionObserver for infinite scrolling
    let interOptions = {
      rootMargin: "0px",
      threshold: 0.5
    };

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const hasMoreArticles = ((pageRef.current * RESULT_LIMIT) < totalArticleCount.current);

          if (hasMoreArticles && entry.isIntersecting && !isLoading) {
            pageRef.current = pageRef.current + 1;
            fetchAppendArticles(pageRef.current, abortController.current, searchParams.get("topic"),
                searchParams.get("sort_by"), searchParams.get("order"), searchParams.get("search"));
          }
        });
      }, 
      interOptions
    );

    if (lastCardRef.current)
      observer.observe(lastCardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [articles]);

  const fetchAppendArticles = (page = 1, abortController, topic, sortBy, order, search) => {
    if (DEBUG)
      console.log("Fetching articles!");

    setErrMsg(null);
    setIsLoading(true);
    currentReqCount.current++;

    const url = constants.ARTICLES_API_URL;

    const axOptions = {
      signal: abortController.signal,
      params: {
        p: page,
        topic: topic,
        sort_by: sortBy,
        order: order,
        search: search
      }
    };

    axios.get(url, axOptions)
        .then(({data}) => {
          if (DEBUG)
            console.log("Articles fetched successfully!");

          setErrMsg(null);

          // Append articles
          setArticles((currArticles) => {return [...currArticles, ...data.articles]});

          // Set totalArticleCount
          if (data.articles.length)
            totalArticleCount.current = data.articles[0].total_count;
        })
        .catch((err) => {
          if (DEBUG)
            console.log(err);

          if (err.code && err.code === "ERR_NETWORK") {
            setErrMsg("A network error occurred!");
          }
          else if (err.response && err.response.status) {
            if (err.response.status === 404) 
              setErrMsg("Resouce does not exist!");
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

  let articlesBody;

  if (!isLoading && errMsg) {
    articlesBody = (
      <div className="err-msg-default-container">
        <img className="err-msg-default-img" src="/images/logo_sad.svg" />
        <p className="err-msg-default">{errMsg}</p>
      </div>
    );
  }
  else if (!isLoading && !articles.length) {
    articlesBody = (<p className="no-articles-found">No articles found!</p>);
  } 
  else {
    articlesBody = articles.map((article, i, arr) => {
      const articleCard = 
          <ArticleCard 
            article={article} upDownVoteArticle={upDownVoteArticle} setArticles={setArticles}
          />;

      const isLastCard = (arr.length - 1 === i);

      return (
        <Link 
          className="article-card-full-link" to={`/articles/${article.article_id}`}
          key={article.article_id}
        > 
          {isLastCard ? 
              <div className="article-card last-card" ref={lastCardRef}>
                {articleCard}
              </div>
            :
              <div className="article-card" >
                {articleCard}
              </div>                
          }
        </Link>
      );      
    });
  }

  return (
      <section className="content-section">
        <FilterBar />
        {articlesBody}

        {isLoading ?
            (
              (!articles.length) ?
                  <Loading />
                :
                  <Loading size="small" />
            )
          : 
            null
        }
      </section>    
  );
}

export default Articles;