import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

import constants from '../../constants';

import Loading from '../Loading';

import './index.css';

function Article() {
  let {article_id: articleId} = useParams();
  console.log(articleId);
  
  let [article, setArticle] = useState({});
  let [isLoading, setIsLoading] = useState(false);

  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  // On component mount
  useEffect(() => {
    console.log("Mounting Article component!");
    abortController.current = new AbortController();    

    setArticle({});

    fetchPopulateArticle(articleId, abortController.current);

    return () => {
      abortController.current.abort();
    };
  }, []);

  const fetchPopulateArticle = (articleId, abortController) => {
    console.log(`Fetching Article where article_id: ${articleId}`);

    currentReqCount.current++;

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

  return (
    <section className="content-section">
      <h1>TESTING</h1>
    </section>
  );
}

export default Article;