import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './Header';
import Articles from './Articles';
import Article from './Article';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ErrorOverlay from './ErrorOverlay';

import {UserContext} from '../contexts/User';

import constants from '../constants';

import './App.css';

function App() {
  // If errOverlayMsg is null, then no error overlay is displayed.
  const [errOverlayMsg, setErrOverlayMsg] = useState(null);

  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log("Caching loading images!");
    new Image().src = '/images/loading_icon.svg';
  }, []);

  const upDownVoteArticle = async (articleId, increment) => {
    if (!user) {
      setErrOverlayMsg(constants.ERR_MSG_NOT_LOGGED_IN);

      throw new Error("USER_NOT_LOGGED_IN");
    }

    // Try and upvote article
    const url = `${constants.ARTICLE_BASE_API_URL}${articleId}`;

    const reqBody = {inc_votes: increment};

    return axios.patch(url, reqBody)
        .then(({data}) => {
          return data.article;
        })
        .catch((err) => {
          console.log("ERROR: Could not upvote article!");
          console.log(err);
          setErrOverlayMsg("Unable to register article vote!");

          throw new Error("SERVER_ERROR");
        });
  };

  return (
    <>
      <Header />
      <main className="main-body">
        <Routes>
          <Route 
            path="/"
            element={<Articles upDownVoteArticle={upDownVoteArticle} />} 
          />
          <Route 
            path={"/articles"}
            element={<Articles upDownVoteArticle={upDownVoteArticle} />} 
          />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {errOverlayMsg ? 
          <ErrorOverlay errOverlayMsg={errOverlayMsg} setErrOverlayMsg={setErrOverlayMsg}/> 
        : 
          null
      }
    </>
  )
}

export default App;