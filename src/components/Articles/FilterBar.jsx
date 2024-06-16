import { useRef, useState } from 'react';
import './FilterBar.css';

function FilterBar() {
  const [categoryBtnState, setCategoryBtnState] = useState("All Categories");
  const [sortBtnState, setSortBtnState] = useState("Date");
  const [orderBtnState, setOrderBtnState] = useState("Descending");

  const handleCategoryClick = (event) => {
    console.log(event.target.name);

    setCategoryBtnState(event.target.name);
  };

  const handleSortByClick = (event) => {
    console.log(event.target.name);

    setSortBtnState(event.target.name);
  };

  const handleOrderClick = (event) => {
    console.log(event.target.name);

    if (event.target.name === "asc")
      setOrderBtnState("Ascending");
    else
      setOrderBtnState("Descending");
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__container">
        <button className="dropdown__btn">
          <span className="filter-bar__span">Category:</span>
          <span className="filter-bar__btn-state">{categoryBtnState}</span>
        </button>
        <div className="dropdown-menu">
          <button name="all" className="dropdown-menu__link" onClick={handleCategoryClick}>
            All
          </button>          
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
        <button className="dropdown__btn">
          <span className="filter-bar__span">Sort By:</span>
          <span className="filter-bar__btn-state">{sortBtnState}</span>
        </button>
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
        <button className="dropdown__btn">
          <span className="filter-bar__span">Order:</span>
          <span className="filter-bar__btn-state">{orderBtnState}</span>
        </button>
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
