import React from "react";

export default function Order(props) {
  return (
    <div className="order">
      <strong>
        CLIENTE: {props.client}
      </strong>
      <br />
      {props.date}
      <br />
      ARTÍCULO: {props.article}
      <br />
      CANTIDAD: {props.quantity}
      <br />
      ESTADO: {props.status}
    </div>
  );
}
