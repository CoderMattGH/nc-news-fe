import {Routes, Route} from 'react-router-dom';

import Header from './Header';
import Articles from './Articles';
import Article from './Article';
import Login from './Login';
import Logout from './Logout';

import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log("Caching loading images!");
    new Image().src = '/images/loading_icon.svg';
  });

  return (
    <>
      <Header />
      <main className="main-body">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </>
  )
}

export default App;