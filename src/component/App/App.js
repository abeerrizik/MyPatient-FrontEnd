import React, {useEffect, useState} from "react";
import {Switch, Route,useHistory} from "react-router-dom";
import "./App.css";
import HomeScreen from "../screen/HomeScreen/homeScreen";
import LoginScreen from "../screen/loginScreen/loginScreen";
import {routes} from "../../constants";
import {getNurseData, logout} from "../../utils/login";
import TreatmentScreen from "../screen/treatmentScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar} from "react-bootstrap";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory()
    useEffect(()=>{
        getNurseData().then((data)=>{
            setIsLoggedIn(Boolean(data))
        })

    },[])

    function handleLogout(){
        logout().then(()=>setIsLoggedIn(false))
    }


    if (!isLoggedIn)
        return <div className="App">
            <LoginScreen onLogin={()=>setIsLoggedIn(true)}/>
        </div>


    return (
        <div className="App" >
            <Navbar variant={"dark"} bg={"dark"} style={{display:"flex",justifyContent:"space-between"}}>
                <Navbar.Brand>google.com</Navbar.Brand>
                <Button variant={"success"} onClick={handleLogout}>logout</Button>
            </Navbar>

            <Switch>

                <Route exact path={"/treatment/:id"}>
                    <TreatmentScreen/>
                </Route>
                <Route  path={routes.home}>
                    <HomeScreen/>
                </Route>

            </Switch>
        </div>
    );
}

export default App;
