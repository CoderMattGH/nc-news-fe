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

  const upVoteArticle = () => {
    if (!user) {
      console.log("ERROR: Only logged in users can vote!");

      setErrOverlayMsg(constants.ERR_MSG_NOT_LOGGED_IN);
      return;
    }
  };

  const downVoteArticle = () => {
    if(!user) {
      console.log("ERROR: Only logged in users can vote!");

      setErrOverlayMsg(constants.ERR_MSG_NOT_LOGGED_IN);
      return;
    }
  }

  // TODO: Cleaner implementation of "/" and "/articles" routes.
  return (
    <>
      <Header />
      <main className="main-body">
        <Routes>
          <Route 
            path="/"
            element={<Articles upVoteArticle={upVoteArticle} downVoteArticle={downVoteArticle} />} 
          />
          <Route 
            path={"/articles"}
            element={<Articles upVoteArticle={upVoteArticle} downVoteArticle={downVoteArticle} />} 
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