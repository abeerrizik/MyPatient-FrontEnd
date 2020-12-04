import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "../screen/HomeScreen/homeScreen";
import { routes } from "../../constants";
import LoginScreen from "../screen/loginScreen/loginScreen";

function App() {
  // const [IsLogin, setIsLogin] = React.useState(false);
  return (
    <div className="App">
      <Switch>
        <Route exact path={routes.login}>
          <LoginScreen />
        </Route>
        <Route exact path={routes.home}>
          <HomeScreen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
