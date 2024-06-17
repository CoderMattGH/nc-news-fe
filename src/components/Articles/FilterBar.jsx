import {useEffect, useState}  from 'react';
import {useSearchParams} from 'react-router-dom';

import './FilterBar.css';

function FilterBar() {
  const [categoryBtnState, setCategoryBtnState] = useState("All");
  const [sortBtnState, setSortBtnState] = useState("Date");
  const [orderBtnState, setOrderBtnState] = useState("Descending");
  
  const [categoryMenuVis, setCategoryMenuVis] = useState(false);
  const [sortMenuVis, setSortMenuVis] = useState(false);
  const [orderMenuVis, setOrderMenuVis] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);    

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set state to reflect searchParams
  useEffect(() => {
    parseSearchParamsToState(searchParams);
  }, [searchParams]);

  const parseSearchParamsToState = (searchParams) => {
    const topicParam = searchParams.get('topic');
    if (topicParam !== null)
      setCategoryBtnState(searchParams.get('topic').toLowerCase());

    const sortByParam = searchParams.get('sort_by');
    if (sortByParam === 'comment_count')
      setSortBtnState("Comments");
    else if (sortByParam === 'created_at')
      setSortBtnState("Date");
    else if (sortByParam !== null)
      setSortBtnState(sortByParam.toLowerCase());
    
    const orderParam = searchParams.get('order');
    if (orderParam === 'asc')
      setOrderBtnState("Ascending");  
  };

  const handleClickOutside = (event) => {
    const className = event.target.className;

    const ignoreClasses = ["dropdown-menu__link", "dropdown-menu", "dropdown__btn", 
        "filter-bar__btn-state", "filter-bar__span"];

    // Prevent closing dropdown menu
    if (!ignoreClasses.includes(className))
      toggleOffAllMenuVis();
  };

  const toggleCategoryMenuVis = () => {
    // Turn off other menus
    setSortMenuVis(false);
    setOrderMenuVis(false);

    setCategoryMenuVis(visibility => !visibility);
  };

  const toggleSortMenuVis = () => {
    // Turn off other menus
    setCategoryMenuVis(false);
    setOrderMenuVis(false);

    setSortMenuVis(visibility => !visibility);
  };

  const toggleOrderMenuVis = () => {
    // Turn off other menus
    setCategoryMenuVis(false);
    setSortMenuVis(false);

    setOrderMenuVis(visibility => !visibility);
  };

  const toggleOffAllMenuVis = () => {
    setCategoryMenuVis(false);
    setSortMenuVis(false);
    setOrderMenuVis(false);
  };

  const handleCategoryClick = (event) => {
    const topic = event.target.name;
    console.log("Clicked Category: ", topic);

    setCategoryBtnState(topic);
    toggleOffAllMenuVis();

    setSearchParams((currSearchParams) => {
      if (topic === 'all')
        currSearchParams.delete('topic');
      else
        currSearchParams.set('topic', topic);

      return currSearchParams;
    });
  };

  const handleSortByClick = (event) => {
    const sortBy = event.target.name;
    console.log("Clicked Sort By: ", sortBy);

    setSortBtnState(sortBy);
    toggleOffAllMenuVis();

    setSearchParams((currSearchParams) => {
      if (sortBy === "date")
        currSearchParams.delete('sort_by');
      if (sortBy === "comments")
        currSearchParams.set('sort_by', 'comment_count');
      else
        currSearchParams.set('sort_by', sortBy);

      return currSearchParams;
    });
  };

  const handleOrderClick = (event) => {
    const order = event.target.name;
    console.log("Clicked Order: ", order);

    if (order === "asc")
      setOrderBtnState("Ascending");
    else
      setOrderBtnState("Descending");

    toggleOffAllMenuVis();

    setSearchParams((currSearchParams) => {
      if (order === "desc")
        currSearchParams.delete('order');
      else
        currSearchParams.set('order', order);
      
      return currSearchParams;
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__container">
        <button className="dropdown__btn" onClick={() => toggleCategoryMenuVis()}>
          <span className="filter-bar__span">Category:</span>
          <span className="filter-bar__btn-state">{categoryBtnState}</span>
        </button>

        {categoryMenuVis ?
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
          :
            null
        }
      </div>

      <div className="filter-bar__container">
        <button className="dropdown__btn" onClick={toggleSortMenuVis}>
          <span className="filter-bar__span">Sort By:</span>
          <span className="filter-bar__btn-state">{sortBtnState}</span>
        </button>

        {sortMenuVis ?
            <div className="dropdown-menu">
              <button name="author" className="dropdown-menu__link" onClick={handleSortByClick}>
                Author
              </button>
              <button name="created_at" className="dropdown-menu__link" onClick={handleSortByClick}>
                Date
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
          :
            null
        }
      </div>  

      <div className="filter-bar__container">
        <button className="dropdown__btn" onClick={() => toggleOrderMenuVis()}>
          <span className="filter-bar__span">Order:</span>
          <span className="filter-bar__btn-state">{orderBtnState}</span>
        </button>

        {orderMenuVis ?
            <div className="dropdown-menu">
              <button name="asc" className="dropdown-menu__link" onClick={handleOrderClick}>
                Ascending
              </button>
              <button name="desc" className="dropdown-menu__link" onClick={handleOrderClick}>
                Descending
              </button>
            </div>
          :
            null
        }
      </div>        
    </div>
  );
}

export default FilterBar;
