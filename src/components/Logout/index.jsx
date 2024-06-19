import {useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import Loading from "../Loading";

import {UserContext} from "../../contexts/User";

import './index.css';

function Logout() {
  const {user, setUser} = useContext(UserContext);

  const navigate = useNavigate();

  // On Component Mount
  useEffect(() => {
    console.log("Logging out user!");

    navigate("/");

    return (() => {
      setUser(null);
    });
  }, []);

  return;
}

export default Logout;