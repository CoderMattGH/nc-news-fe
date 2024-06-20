import axios from 'axios';
import {useEffect, useRef, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../Loading';

import {UserContext} from '../../contexts/User';

import constants from '../../constants';
import usernameValidator from '../../validators/username-validator';

import './index.css';

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [formEnabled, setFormEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const abortController = useRef(null);

  const {user, setUser} = useContext(UserContext);

  const navigate = useNavigate();

  // On component mount.
  useEffect(() => {
    console.log("Mounting Login component!");

    if (user) {
      navigate("/");

      return;
    }

    setUsernameInput("");
    setPasswordInput("");
    setFormEnabled(true);
    setIsLoading(false);
    setErrMsg("");

    abortController.current = new AbortController();

    // On dismount, cancel any login requests
    return () => {
      abortController.current.abort()
    };
  }, []);

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  const toggleFormInputs = (enabled) => {
    setFormEnabled(enabled);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = usernameInput.trim();

    const usernameValObj = usernameValidator(username);
    if (!usernameValObj.valid) {
      setErrMsg(usernameValObj.msg);

      return;
    }

    toggleFormInputs(false);
    setErrMsg(null);
    setIsLoading(true);

    checkLogin(username, abortController.current);
  };

  const checkLogin = (username, abortController) => {
    const url = `${constants.USERS_API_URL}/${username}`;

    const axOptions = {
      signal: abortController.signal,
    };

    let credentialsOK = false;
    axios.get(url, axOptions)
        .then(({data}) => {
          setUser(data.user);
          
          credentialsOK = true;
        })
        .catch((err) => {
          // TODO: Handle errors properly
          console.log(err);

          // If error is from server
          if (err.response) {
            if (err.response.status === 404)
              setErrMsg("Invalid username or password!");
            else
              setErrMsg("An unknown error occurred!");
          } else {
            setErrMsg("An unknown error occurred!");
          }
        })
        .finally(() => {
          setIsLoading(false);
          toggleFormInputs(true);

          if (credentialsOK) {
            console.log("Forwarding to home page!");
            navigate("/");
          }
        });
  };

  return (
    <section className="login">
      <div className="login-header">
        <img className="login-title-img" src="images/logo.svg" />
        <h2 className="login-title">Log in to NC News</h2>
      </div>
      
      {errMsg ? (<p className="login-error-msg">Error: {errMsg}</p>) : null}

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
          Sign In
        </button>
      </form>

      {isLoading ? (<Loading size="small" />) : null}
    </section>
  );
}

export default Login;