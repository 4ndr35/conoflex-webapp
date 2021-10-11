import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import "../../styles/orders/DeliveredOrders.css";

export default function DeliveredOrders() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const getDeliveredOrders = () => {
    Axios.get("https://centralconoflex.herokuapp.com/deliveredorders").then((response) => {
      setDeliveredOrders(response.data);
    });
  };

  const handleClick = (index) => {
    console.log(index);
    Axios.put("https://centralconoflex.herokuapp.com/updateorder", {
      idorder: index,
      status: "COMPLETED",
    }).then((response) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    //console.log(pendingOrders)
    getDeliveredOrders();
  }, [deliveredOrders]);

  return (
    <div className="deliveredorders-table">
      <h3>{deliveredOrders.length} artículos entregados</h3>
      <table>
        <tbody>
          <tr>
            <td className="table-top">CLIENT</td>
            <td className="table-top">DATE</td>
            <td className="table-top">ARTICLE</td>
            <td className="table-top">QUANTITY</td>
            <td className="table-top">STATUS</td>
            <td className="table-top">VUELTA A DEPÓSITO</td>
          </tr>
          {deliveredOrders.map((val, index) => {
            return (
              <tr key={index}>
                <td>{val.client}</td>
                <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                <td>{val.article}</td>
                <td>{val.quantity}</td>
                <td>{val.status}</td>
                <button
                    className="order-completed"
                    onClick={() => handleClick(val.idorder)}
                  >
                    A DEPÓSITO
                  </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}