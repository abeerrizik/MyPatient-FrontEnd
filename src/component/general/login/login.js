import React from "react";
import "./login.css";
import {Alert, Button, Card, Form} from "react-bootstrap"

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
      <div style={{display:"flex",flexDirection:"column", height:"300px", width:"400px", alignItems:"center"}}>

      <Card className={"login_card"}>
        <img src="/img/logo.svg" alt="logo image" className={"login_logo"}/>
        <h5 className="login_title">Nursiri</h5>
        <Form
          action="#"
          className="login_form"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <div className="login_form_inputs">
            <Form.Control
              className="input"
              type="id"
              placeholder="ID Number"
              name="id"
              value={id}
              onChange={(e) => onIdChange(e.target.value)}
            />
            <Form.Control
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </div>
          <Button className="input login_submit" type="submit" value="login"  ><img src="/img/icon-arrow.svg"  alt=""/> </Button>
        </Form>


    </Card>
      {error && <Alert style={{marginTop:"10px",boxShadow:"0 0 2px  rgba(0,0,0.3)"}} variant={"danger"}>{error}</Alert>}
      </div>

    </div>
  );
};

export default Login;
