import React from "react";
import '../styles/Employee.css';

export default function Employee(props) {
  return (
    <div className="employee">
      <strong>
        {props.name} {props.lastname}
      </strong>
      <br />
      {props.ubication}
      <br />
      {props.turn}
    </div>
  );
}
