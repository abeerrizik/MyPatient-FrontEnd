import React, {useEffect, useState} from "react";
import {Switch, Route,useHistory} from "react-router-dom";
import "./App.css";
import HomeScreen from "../screen/HomeScreen/homeScreen";
import LoginScreen from "../screen/loginScreen/loginScreen";
import {routes} from "../../constants";
import {getNurseData} from "../../utils/login";
import TreatmentScreen from "../screen/treatmentScreen";
import "bootstrap/dist/css/bootstrap.css"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory()
    useEffect(()=>{
        getNurseData().then((data)=>{
            setIsLoggedIn(Boolean(data))
            history.push(routes.home)
        })

    },[])
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
                <Route path={"/treatment/:id"}>
                    <TreatmentScreen/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
