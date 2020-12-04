import React from "react";
import "./login.css";

import { routes } from "../../../constants";

const Login = function ({
  id,
  password,
  handleClick,
  onIdChange,
  onPasswordChange,
  error,
}) {
  return (
    <div
      className="login"
      style={{ backgroundImage: "url(/img/patient_help2.jpg)" }}
    >
      <div className="login_container">
        <div className="login_title">Nursiri</div>
        <h2 className="login_formTitle">Login</h2>
        <form
          action="#"
          className="login_form"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <div className="login_form_inputs">
            <input
              className="input"
              type="id"
              placeholder="Id..."
              name="id"
              value={id}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </div>
          <input className="input" type="submit" value="login" />
        </form>

        <h2 className="login_error"> {error}</h2>
      </div>
      {/* <footer>
        <img
          className="img"
          src="/img/Screenshot from 2020-12-04 19-49-23.png"
        ></img>
      </footer> */}
    </div>
  );
};

export default Login;
