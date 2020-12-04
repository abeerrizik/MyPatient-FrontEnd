import React from "react";
import Login from "../../general/login";
import "./loginScreen.css";
import { login } from "../../../utils/login";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants";
import {
  notificationSubscribe,
  requestNotificationPermission,
} from "../../../notificationManger";

function LoginScreen() {
  const [nurseData, setNurseData] = React.useState({ id: "", password: "" });
  const history = useHistory();

  const handleClick = () => {
      (async ()=>{
          try {
             await login(nurseData.id, nurseData.password)
              history.push(routes.homeScreen);
          } catch (e) {
              console.log(e)
              setNurseData({...nurseData,error:e.message})
              return;
          }
          try {
              await requestNotificationPermission()
              await notificationSubscribe()
          }
          catch (e){
              console.error(e)
          }

      })()

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
