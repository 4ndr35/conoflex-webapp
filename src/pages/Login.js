import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

export default function Login(props) {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    Axios.get("https://centralconoflex.herokuapp.com/users").then(
      (response) => {
        setUsers(response.data);
      }
    );
  };

  const handleLogin = (userName, password) => {
    users.map((user) => {
      if (user.username === userName && user.password === password) {
        props.setLoginStatus(true);
        console.log("click");
      }
    });
  };

  useEffect(() => {
    getUsers();
    console.log(props.loginStatus);
  }, [props.loginStatus]);

  return (
    <div className="mt-5">
      <div className="container">
        {!props.loginStatus ? (
          <Form className="container w-50">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => {
                  props.setUserName(event.target.value);
                }}
                type="text"
                placeholder="Ingresa el usuario"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="lastname"
                onChange={(event) => {
                  props.setPassword(event.target.value);
                }}
                type="password"
                placeholder="Ingresa la contraseña"
              />
            </Form.Group>
            <Button
              onClick={() => handleLogin(props.userName, props.password)}
              variant="primary"
            >
              Ingresar
            </Button>
          </Form>
        ) : (
          <div className="container">
            Usuario logueado
            <br />
            <strong>Usuario:</strong> {props.userName}
          </div>
        )}
      </div>
    </div>
  );
}
