import React from "react";
import '../styles/orders/Order.css';

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
