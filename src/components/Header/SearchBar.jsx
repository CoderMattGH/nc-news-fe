import DEBUG from '../../constants/debug';

import {useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import './SearchBar.css';

function SearchBar() {
  const MAX_SEARCH_LEN = 200;

  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInput = (event) => {
    if (event.target.value.length > MAX_SEARCH_LEN)
      return;

    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    if (DEBUG)
      console.log("Submitting Search form!");

    event.preventDefault();
    
    const searchString = searchInput.trim();

    // Add search string to searchParams
    setSearchParams((currSearchParams) => {
      currSearchParams.set('search', searchString);

      return currSearchParams;
    });
  };

  const validateSearchString = (searchStr) => {
    if (searchStr.trim() === "")
      return {valid: false, msg:"Search cannot be empty!"};
    
    return {valid: true};
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input className="search-bar__input" onChange={handleSearchInput} value={searchInput} 
            type="text" placeholder="Search" />
      </form>
    </div>
  );
}

export default SearchBar;