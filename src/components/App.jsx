import axios from 'axios';
import {useContext, useEffect, useRef, useState} from 'react';
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
  // If null do not display; if set display.
  const [errOverlayMsg, setErrOverlayMsg] = useState(null);

  // Keep track of which articles the user has voted on: eg. {article_id: 1, increment: -1}
  const userVotes = useRef([]);

  const {user} = useContext(UserContext);

  useEffect(() => {
    new Image().src = '/images/loading_icon.svg';
  }, []);

  // On user context change, empty votes array.
  useEffect(() => {
    userVotes.current = [];
  }, [user]);

  const upDownVoteArticle = async (articleId, increment) => {
    if (!user) {
      setErrOverlayMsg(constants.ERR_MSG_NOT_LOGGED_IN);

      throw new Error("USER_NOT_LOGGED_IN");
    }

    if (!canUserVote(articleId, increment))
      throw new Error("USER_ALREADY_VOTED");

    addToUserVotes(articleId, increment);

    // Try and upvote article
    const url = `${constants.ARTICLES_API_URL}/${articleId}`;

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

  const addToUserVotes = (articleId, increment) => {
    for (const userObj of userVotes.current) {
      if (userObj.article_id === articleId) {
        userObj.increment += increment;

        return;
      }
    }

    const voteObj = {article_id: articleId, increment: increment};

    userVotes.current = [...userVotes.current, voteObj];
  };

  const canUserVote = (articleId, increment) => {
    for (const voteObj of userVotes.current) {
      if (voteObj.article_id === articleId) {
        if ((voteObj.increment + increment > 1) || 
            (voteObj.increment + increment < -1)) {
          return false;
        } else {
          return true;
        }
      }
    }

    return true;
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
          <Route 
            path="/articles/:article_id" 
            element={
              <Article upDownVoteArticle={upDownVoteArticle} setErrOverlayMsg={setErrOverlayMsg}/>
            }
          />
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