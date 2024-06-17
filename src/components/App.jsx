import {Routes, Route} from 'react-router-dom';

import Header from './Header';
import Articles from './Articles';
import Article from './Article';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-body">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </main>
    </>
  )
}

export default App;