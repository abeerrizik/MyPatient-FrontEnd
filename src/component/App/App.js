import React, {useState} from "react";
import {Switch, Route} from "react-router-dom";
import "./App.css";
import HomeScreen from "../screen/HomeScreen/homeScreen";
import LoginScreen from "../screen/loginScreen/loginScreen";
import {routes} from "../../constants";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    if (!isLoggedIn)
        return <div className="App">
            <LoginScreen onLogin={()=>setIsLoggedIn(true)}/>
        </div>


    return (
        <div className="App" >
            <Switch>
                <Route path={routes.home}>
                    <HomeScreen/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
