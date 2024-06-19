import {useContext} from 'react';

import {UserContext} from '../../contexts/User';

import './MenuBar.css';

function MenuBar() {
  const {user} = useContext(UserContext);

  return (
    <nav className="nav">
      {(user) ?
          <li className="nav__entry">
            Logout
          </li>
        :
          <>
            <li className="nav__entry">
              Log in
            </li>
            <li className="nav__entry">
              Register
            </li>
          </>
      }
    </nav>
  );
}

export default MenuBar;