import './Articles.css';

function Articles() {
  return (
    <section className="articles-section">
      <div className="article-card">
        <img className="article-card__img" 
            src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"/>
        <h2 className="article-card__title">The battle for Node.js security has only begun</h2>
        <p className="article-card__desc-summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor ante eu risus tempor, 
          at efficitur lorem elementum. Nulla maximus dapibus est, sit amet eleifend justo lacinia eu. 
          Nunc auctor tellus a enim mollis, vitae facilisis risus pharetra. Vivamus ac mauris non felis 
          lacinia varius id eu lectus. Praesent libero nibh, dapibus at faucibus nec, elementum vitae risus. 
          Nunc a tempor tortor. Etiam ultricies sollicitudisd...         
        </p>
        <div className="article-card__footer">
          <p className="article-card__votes article-card__element--gray">
            <img className="article-card__vote_btn" src="./images/buttons/upvote.svg" />
            <span className="article-card__vote_cnt">0</span>
            <img className="article-card__vote_btn" src="./images/buttons/downvote.svg" />
          </p>
          <p className="article-card__category article-card__element--gray">Coding</p>
          <p className="article_card__date article-card__element--gray">01/12/2023</p>
          <p className="article_card__comment-count article-card__element--gray">11 comments</p>
        </div>
      </div>

      <div className="article-card">
        <img className="article-card__img" 
            src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"/>
        <h2 className="article-card__title">The battle for Node.js security has only begun</h2>
        <p className="article-card__desc-summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor ante eu risus tempor, 
          at efficitur lorem elementum. Nulla maximus dapibus est, sit amet eleifend justo lacinia eu. 
          Nunc auctor tellus a enim mollis, vitae facilisis risus pharetra. Vivamus ac mauris non felis 
          lacinia varius id eu lectus. Praesent libero nibh, dapibus at faucibus nec, elementum vitae risus. 
          Nunc a tempor tortor. Etiam ultricies sollicitudisd...         
        </p>
        <div className="article-card__footer">
          <p className="article-card__votes article-card__element--gray">
            <img className="article-card__vote_btn" src="./images/buttons/upvote.svg" />
            <span className="article-card__vote_cnt">0</span>
            <img className="article-card__vote_btn" src="./images/buttons/downvote.svg" />
          </p>
          <p className="article-card__category article-card__element--gray">Coding</p>
          <p className="article_card__date article-card__element--gray">01/12/2023</p>
          <p className="article_card__comment-count article-card__element--gray">11 comments</p>
        </div>
      </div>      
    </section>
  );
}

export default Articles;