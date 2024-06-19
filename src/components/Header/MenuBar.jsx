import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {UserContext} from '../../contexts/User';

import './MenuBar.css';

function MenuBar() {
  const {user} = useContext(UserContext);

  const navigate = useNavigate();

  const clickLogin = (event) => {
    event.preventDefault();

    navigate("/login");
  };

  const clickRegister = (event) => {
    event.preventDefault();

    navigate("/register");
  };

  const clickLogout = (event) => {
    event.preventDefault();

    navigate("/logout");
  };

  return (
    <nav className="nav">
      {(user) ?
          <li className="nav__entry">
            <button className="menu-bar-button menu-bar-button__logout" onClick={clickLogout}>
              Logout:
              <span className="menu-bar-button__username">{user.username}</span>
            </button>
          </li>
        :
          <>
            <li className="nav__entry">
              <button className="menu-bar-button" onClick={clickLogin}>Log in</button>
            </li>
            <li className="nav__entry">
              <button className="menu-bar-button" onClick={clickRegister}>Register</button>
            </li>
          </>
      }
    </nav>
  );
}

export default MenuBar;