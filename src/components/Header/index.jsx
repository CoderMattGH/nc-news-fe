import MenuBar from './MenuBar';
import SearchBar from './SearchBar';
import './index.css';

function Header() {
  return (
    <header className="header">
      <div className="title">
        <img alt="Title Logo" className="title__logo" src="./images/logo.svg" />
        <img alt="Title Image" className="title__img" src="./images/title_main.svg" />
      </div>
      <SearchBar />
      <MenuBar />
    </header>
  );
}

export default Header;