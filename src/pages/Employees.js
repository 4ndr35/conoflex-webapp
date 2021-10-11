import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Employees.css";
import Employee from "../components/Employee";

export default function Home() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ubication, setUbication] = useState("");
  const [turn, setTurn] = useState("");

  const [employees, setEmployees] = useState([]);

  const addEmployee = () => {
    Axios.post("https://centralconoflex.herokuapp.com/createemployee", {
      name: name,
      lastName: lastName,
      ubication: ubication,
      turn: turn,
    }).then(() => {
      console.log("success");
    });
  };

  const getEmployees = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getemployees").then((response) => {
      setEmployees(response.data);
    });
  };

  useEffect(() => {
    getEmployees();
  }, [employees]);

  return (
    <div className="employees">
      <div className="form">
        <h4>Ingresar nuevo empleado</h4>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Apellido</label>
        <input
          type="text"
          name="lastname"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label>Ubicación</label>
        <input
          type="text"
          name="ubication"
          onChange={(event) => {
            setUbication(event.target.value);
          }}
        />
        <label>Turno</label>
        <input
          type="text"
          name="turn"
          onChange={(event) => {
            setTurn(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Ingresar</button>
      </div>
      <div className="list-employees">
        <h4>Lista de empleados</h4>
        <div className="employees-box">
          {employees.map((val, key) => {
            return (
                <Employee
                  key = {val.idemployees}
                  name={val.name}
                  lastName={val.lastname}
                  ubication={val.ubication}
                  turn={val.turn}
                />
            );
          })}
        </div>
      </div>
    </div>
  );
}
