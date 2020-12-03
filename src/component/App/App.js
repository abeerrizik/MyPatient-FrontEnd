import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import LoginScreen from "../screen/loginScreen";
import { routes } from "../../constants";
import {
  notificationSubscribe,
  requestNotificationPermission,
} from "../../notificationManger";

function App() {
  useEffect(() => {
    requestNotificationPermission().then(() => notificationSubscribe());
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path={routes.home}>
          <LoginScreen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
