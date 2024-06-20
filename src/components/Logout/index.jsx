import {useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {UserContext} from "../../contexts/User";

import './index.css';

function Logout() {
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");

    return (() => {setUser(null);});
  }, []);
}

export default Logout;