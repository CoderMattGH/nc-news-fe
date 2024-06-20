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

  // Reference to last ArticleCard for infinite scrolling.
  const lastCardRef = useRef(null);

  const pageRef = useRef(null);
  const totalArticleCount = useRef(null);
  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  // On mount and when searchParams change.
  useEffect(() => {
    console.log("Mounting Articles component!");
    abortController.current = new AbortController();

    pageRef.current = 1;
    setArticles([]);

    const topicParam = searchParams.get("topic");
    const sortByParam = searchParams.get("sort_by");
    const orderParam = searchParams.get("order");

    console.log(`Params: ${topicParam}, ${sortByParam}, ${orderParam}`);

    fetchAppendArticles(pageRef.current, abortController.current, topicParam, 
        sortByParam, orderParam);

    return () => {
      abortController.current.abort();
    };
  }, [searchParams]);

  // Articles State
  useEffect(() => {
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
                searchParams.get("sort_by"), searchParams.get("order"));
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

  const fetchAppendArticles = (page = 1, abortController, topic, sortBy, order) => {
    setIsLoading(true);
    currentReqCount.current++;

    const url = constants.ARTICLES_API_URL;

    const axOptions = {
      signal: abortController.signal,
      params: {
        p: page,
        topic: topic,
        sort_by: sortBy,
        order: order
      }
    };

    axios.get(url, axOptions)
        .then(({data}) => {
          // Append articles
          setArticles((currArticles) => {return [...currArticles, ...data.articles]});

          // Append totalArticleCount
          if (data.articles.length)
            totalArticleCount.current = data.articles[0].total_count;
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR: Unable to fetch articles!");
        })
        .finally(() => {
          currentReqCount.current--;
          if (!currentReqCount.current)
            setIsLoading(false);
        });
  };

  let articlesBody;
  if (!isLoading && !articles.length) {
    articlesBody = <p className="no-articles-found">No articles found!</p>;
  } else {
    articlesBody = articles.map((article, i, arr) => {
      const isLastCard = (arr.length - 1 === i);

      if (isLastCard) {
        return (
          <Link className="article-card-full-link" to={`/articles/${article.article_id}`}
               key={article.article_id}>
            <div className="article-card last-card" ref={lastCardRef}>
              <ArticleCard article={article} upDownVoteArticle={upDownVoteArticle} />
            </div>
          </Link>
        );
      } else {
        return (
          <Link className="article-card-full-link" to={`/articles/${article.article_id}`}
              key={article.article_id}>
            <div className="article-card">
              <ArticleCard 
                article={article} upDownVoteArticle={upDownVoteArticle} setArticles={setArticles}
              />
            </div>
          </Link>
        );      
      }
    });
  }

  return (
      <section className="content-section">
        <FilterBar />
        {articlesBody}

        {isLoading ? <Loading /> : null}
      </section>    
  );
}

export default Articles;