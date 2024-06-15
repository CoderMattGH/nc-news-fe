import { useState } from 'react';
import Header from './components/Header';
import Articles from './components/Articles';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-body">
        <Articles />
      </main>
    </>
  )
}

export default App;