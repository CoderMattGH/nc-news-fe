import './Loading.css';

function Loading({size = 'medium'}) {
  let sectionClassName = 'loading-section ';
  let classStr = 'loading-icon ';
  if (size === 'small') {
    sectionClassName += 'loading-section--padding-normal';
    classStr += 'loading-icon--small';
  }
  else if (size === 'tiny') {
    sectionClassName += 'loading-section--padding-tiny';
    classStr += 'loading-icon--tiny';
  } 
  else {
    sectionClassName += 'loading-section--padding-normal';
    classStr += 'loading-icon--medium';
  }

  return (
    <section className={sectionClassName}>
      <img 
        alt="Loading" className={classStr} src="/images/loading_icon.svg" 
      />
    </section>
  );
}

export default Loading;