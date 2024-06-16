import axios from 'axios';
import {useState,useEffect} from 'react';
import constants from '../constants/';
import dateParsing from '../util-functions/date-parsing';
import './Articles.css';
import Loading from './Loading';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Mounting Articles component!");
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    console.log("Fetching articles...");

    const url = constants.ARTICLES_API_URL;

    setIsLoading(true);
    axios.get(url)
        .then(({data}) => {
          console.log(data);
          console.log("Successfully fetched articles!");

          setArticles(data.articles);
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR: Unable to fetch articles!");
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  let articlesBody;
  if (isLoading) {
    articlesBody = <Loading />
  }
  else if (!articles.length) {
    articlesBody = <p className="no-articles-found">No articles found!</p>;
  } else {
    articlesBody = articles.map((article) => {
      // TODO :Author
      return (
        <div className="article-card" key={article.article_id}>
          <img className="article-card__img" src={article.article_img_url} />
          <h2 className="article-card__title">{article.title}</h2>
          <p className="article-card__desc-summary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor ante eu risus tempor, 
            at efficitur lorem elementum. Nulla maximus dapibus est, sit amet eleifend justo lacinia
            eu. 
            Nunc auctor tellus a enim mollis, vitae facilisis risus pharetra. Vivamus ac mauris non 
            felis lacinia varius id eu lectus. Praesent libero nibh, dapibus at faucibus nec, elementum 
            vitae risus. Nunc a tempor tortor. Etiam ultricies sollicitudisd...   
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
        </div>
      );
    });
  }

  return (
    <section className="articles-section">
      {articlesBody}
    </section>    
  );
}

export default Articles;