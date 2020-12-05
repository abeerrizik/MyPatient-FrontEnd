import React, {useEffect, useState} from "react";
import {Switch, Route,useHistory,Link} from "react-router-dom";
import "./App.css";
import HomeScreen from "../screen/HomeScreen/homeScreen";
import LoginScreen from "../screen/loginScreen/loginScreen";
import {routes} from "../../constants";
import {getNurseData, logout} from "../../utils/login";
import TreatmentScreen from "../screen/treatmentScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav, Navbar} from "react-bootstrap";
import Div100vh from 'react-div-100vh'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
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
        <Div100vh  className="App" >


            <div className={"backgroundImg"} style={{backgroundImage:"url(/img/47549.jpg)"}}/>
            <Navbar variant={"dark"} bg={"dark"} className={"navBar"} >
                <Navbar.Brand as={"div"} className={"navBar_icon"}>
                    <img src="/img/logo3.svg" alt="logo image" className={"navbar_logo"} />
                    <span className={"navBar_logo_text"}>Nursiri</span>
                </Navbar.Brand>
                <div>
                    <Nav.Item ><Link to={routes.home}><h5 className={"navBar_homeButtonText"}>Home</h5></Link></Nav.Item>
                    <Button variant={"success"} onClick={handleLogout}>logout</Button>
                </div>
            </Navbar>
            <div className={"app_content"}>
            <Switch>

                <Route exact path={"/treatment/:id"}>
                    <TreatmentScreen/>
                </Route>
                <Route  path={routes.home}>
                    <HomeScreen/>
                </Route>

            </Switch>
            </div>

        </Div100vh>
    );
}

export default App;
