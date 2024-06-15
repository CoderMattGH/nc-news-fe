import './MenuBar.css';

function MenuBar() {
  return (
    <nav className="nav">
      <li className="nav__entry">
        Home
      </li>
      <li className="nav__entry">
        Articles
      </li>
      <li className="nav__entry">
        Login
      </li>
    </nav>
  );
}

export default MenuBar;