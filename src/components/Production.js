import React from "react";
import "../styles/ProductionComponent.css";

export default function Order(props) {
  return (
    <div className="order">
      <strong>OPERARIO:</strong> {props.employee}
      <br />
      <strong>ARTÍCULO:</strong> {props.article}
      <br />
      <strong>FECHA:</strong> {props.date.toUpperCase()}
      <br />
      <strong>MATERIAL:</strong> {props.material}
      <br />
      <strong>CANTIDAD:</strong> {props.quantity}
      <br />
      <strong>PESO:</strong> {props.weight}
      <br />
      <strong>ESTADO:</strong> {props.confirmed === 0 ? "PENDIENTE" : "CONFIRMADO"}
    </div>
  );
}
