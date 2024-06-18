import './Loading.css';

function Loading({size = 'medium'}) {
  let classStr = 'loading-icon ';
  if (size === 'small')
    classStr += 'loading-icon--small';
  else
    classStr += 'loading-icon--medium';

  return (
    <section className="loading-section">
      <img alt="Loading image" 
          className={classStr}
          src="/images/loading_icon.svg" />
    </section>
  );
}

export default Loading;