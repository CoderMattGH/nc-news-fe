import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input className="search-bar__input" type="text" placeholder="Search NC News" />
    </div>
  );
}

export default SearchBar;