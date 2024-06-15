import MenuBar from './MenuBar';
import SearchBar from './SearchBar';
import './index.css';

function Header() {
  return (
    <header className="header">
      <div className="title">
        <img className="title__logo" src="./images/logo.svg" />
        <img className="title__img" src="./images/title_main.svg" />
      </div>
      <SearchBar />
      <MenuBar />
    </header>
  );
}

export default Header;