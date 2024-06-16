import { useRef } from 'react';
import './FilterBar.css';

function FilterBar() {
  const handleCategoryClick = (event) => {
    console.log(event.target.name);
  };

  const handleSortByClick = (event) => {
    console.log(event.target.name);
  };

  const handleOrderClick = (event) => {
    console.log(event.target.name);
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__container">
        <button className="dropdown__btn">All Categories</button>
        <div className="dropdown-menu">
          <button name="coding" className="dropdown-menu__link" onClick={handleCategoryClick}>
            Coding
          </button>
          <button name="cooking" className="dropdown-menu__link" onClick={handleCategoryClick}>
            Cooking
          </button>
          <button name="football" className="dropdown-menu__link" onClick={handleCategoryClick}>
            Football
          </button>
        </div>
      </div>

      <div className="filter-bar__container">
        <button className="dropdown__btn">Date</button>
        <div className="dropdown-menu">
          <button name="author" className="dropdown-menu__link" onClick={handleSortByClick}>
            Author
          </button>
          <button name="title" className="dropdown-menu__link" onClick={handleSortByClick}>
            Title
          </button>
          <button name="topic" className="dropdown-menu__link" onClick={handleSortByClick}>
            Topic
          </button>
          <button name="votes" className="dropdown-menu__link" onClick={handleSortByClick}>
            Votes
          </button>
          <button name="comments" className="dropdown-menu__link" onClick={handleSortByClick}>
            Comments
          </button>
        </div>
      </div>  

      <div className="filter-bar__container">
        <button className="dropdown__btn">Descending</button>
        <div className="dropdown-menu">
          <button name="asc" className="dropdown-menu__link" onClick={handleOrderClick}>
            Ascending
          </button>
          <button name="desc" className="dropdown-menu__link" onClick={handleOrderClick}>
            Descending
          </button>
        </div>
      </div>  
    </div>
  );
}

export default FilterBar;
