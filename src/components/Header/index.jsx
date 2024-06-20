import { Link } from 'react-router-dom';
import MenuBar from './MenuBar';
import SearchBar from './SearchBar';

import './index.css';

function Header() {
  return (
    <header className="header">
      <div className="title">
        <Link className="link" to="/">
          <img alt="Title Logo" className="title__logo" src="/images/logo.svg" />
        </Link>
        <Link className="link" to="/">
          <img alt="Title Image" className="title__img" src="/images/title_main.svg" />
        </Link>
      </div>
      <SearchBar />
      <MenuBar />
    </header>
  );
}

export default Header;