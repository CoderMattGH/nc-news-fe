import axios from 'axios';
import {useState} from 'react';

import Loading from '../Loading';

import constants from '../../constants';

import './index.css';

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [formEnabled, setFormEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrMsg] = useState(null);

  // On component mount

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  const toggleFormInputs = (enabled) => {
    if (enabled)
      console.log("Enabling form inputs!");
    else
      console.log("Disabling form inputs!");

    setFormEnabled(enabled);
  }

  const handleSubmit = (event) => {
    console.log("Submitting Login form!");
    event.preventDefault();

    // Validate username
    if (usernameInput.trim() === "") {
      console.log("ERROR: Username cannot be empty!");
      setErrMsg("Username cannot be empty!");

      return;
    }

    const usernamePattern = /^[0-9a-zA-Z_]+$/;
    if (!usernamePattern.test(usernameInput)) {
      console.log("ERROR: Username contains invalid characters!");
      setErrMsg("Username contains invalid characters!");

      return;
    }

    // Validation complete!

    toggleFormInputs(false);
    setErrMsg(null);
    setIsLoading(true);

    const username = usernameInput.trim();
  };

  const checkLogin = (username) => {
    console.log("Checking login credentials!");

    const url = `constants.USER_BASE_API_URL${username}`;

    console.log("URL: ", url);

    
  };

  return (
    <section className="login">
      <div className="login-header">
        <img className="login-title-img" src="images/logo.svg" />
        <h2 className="login-title">Log in to NC News</h2>
      </div>
      
      {errMsg ? <p className="login-error-msg">Error: {errMsg}</p> : null}

      <form className="login-box" onSubmit={handleSubmit}>

        <label className="login-input__label" htmlFor="login-box__username">Username:</label>
        <input 
            className="login-input" id="login-box__username" type="text" 
            onChange={handleUsernameInput} value={usernameInput} disabled={!formEnabled}
        />

        <label className="login-input__label" htmlFor="login-box__password">Password:</label>
        <input 
            className="login-input" id="login-box__password" type="password" 
            onChange={handlePasswordInput} value={passwordInput} disabled={!formEnabled}
        />

        <button className="login-button" disabled={!formEnabled}>
          SIGN IN
        </button>
      </form>

      {isLoading ? <Loading size="small" /> : null}
    </section>
  );
}

export default Login;