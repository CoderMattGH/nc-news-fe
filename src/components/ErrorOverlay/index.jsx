import './index.css';

function ErrorOverlay({errOverlayMsg, setErrOverlayMsg}) {
  const handleOKClick = (event) => {
    event.preventDefault();

    setErrOverlayMsg(null);
  };

  return (
    <div className="fullscreen-shadow-overlay">
      <div className="error-overlay">
        <img className="error-overlay-img" src="/images/logo_sad.svg" />
        <p className="error-overlay-message">
          {errOverlayMsg}
        </p>
        <button className="default-button error-overlay-button" onClick={handleOKClick}>OK</button>
      </div>
    </div>
  );
}

export default ErrorOverlay;