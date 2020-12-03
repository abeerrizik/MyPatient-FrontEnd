import React from "react";
import Login from "../../general/login";
import "./loginScreen.css";
import { login } from "../../../utils/login";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants";

function LoginScreen() {
  const [nurseData, setNurseData] = React.useState({ id: "", password: "" });
  const history = useHistory();

  const handleClick = () => {
    login(nurseData.id, nurseData.password)
      .then(() => {
        history.push(routes.home);
      })
      .catch(({ message }) => setNurseData({ ...nurseData, error: message }));
  };
  return (
    <div className="loginPage">
      <Login
        id={nurseData.id}
        password={nurseData.password}
        handleClick={handleClick}
        onIdChange={(value) => setNurseData({ ...nurseData, id: value })}
        onPasswordChange={(value) =>
          setNurseData({ ...nurseData, password: value })
        }
        error={nurseData.error}
      />
    </div>
  );
}

export default LoginScreen;
