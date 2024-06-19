import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {UserContext} from "../../contexts/User";

import './index.css';

function Register() {
  const {user} = useContext(UserContext);

  const navigate = useNavigate();

  // On component mount
  useEffect(() => {
    console.log("Mounting Register component!");

    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <section className="content-section">
      <div className="register-section">
        <img className="register-image" src="images/logo_sad.svg"/>
        <p className="registration-closed-msg">Registration is for NC News is currently closed :(</p>
      </div>
    </section>
  );
}

export default Register;