import DEBUG from '../../constants/debug';

import {useSearchParams, useNavigate} from 'react-router-dom';

import './SearchBar.css';

function SearchBar({searchInput, setSearchInput}) {
  const MAX_SEARCH_LEN = 200;

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSearchInput = (event) => {
    if (event.target.value.length > MAX_SEARCH_LEN)
      return;

    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const searchString = searchInput.trim();

    // Add search string to searchParams
    setSearchParams((currSearchParams) => {
        if (searchString !== "")
          currSearchParams.set('search', searchString);
        else
          currSearchParams.delete('search');

        return currSearchParams;
      });

    navigate(`/articles?${searchParams.toString()}`);
  };

  const validateSearchString = (searchStr) => {
    if (searchStr.trim() === "")
      return {valid: false, msg:"Search cannot be empty!"};
    
    return {valid: true};
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input 
          className="search-bar__input" onChange={handleSearchInput} value={searchInput} 
          type="text" placeholder="Search" 
        />
      </form>
    </div>
  );
}

export default SearchBar;