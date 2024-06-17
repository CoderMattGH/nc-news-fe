import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Articles from './components/Articles';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-body">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </main>
    </>
  )
}

export default App;