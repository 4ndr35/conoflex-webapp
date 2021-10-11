import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import "../../styles/orders/PendingOrders.css";

export default function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);

  const getPendingOrders = () => {
    Axios.get("http://localhost:3001/getpendingorders").then((response) => {
      setPendingOrders(response.data);
    });
  };

  const handleClick = (index) => {
    console.log(index);
    Axios.put("http://localhost:3001/updateorder", {
      idorder: index,
      status: "COMPLETED",
    }).then((response) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    //console.log(pendingOrders)
    getPendingOrders();
  }, [pendingOrders]);

  return (
      <div className="pendingorders-table">
        <h3>{pendingOrders.length} artículos en producción</h3>
        <table>
          <tbody>
            <tr>
              <td className="table-top">CLIENT</td>
              <td className="table-top">DATE</td>
              <td className="table-top">ARTICLE</td>
              <td className="table-top">QUANTITY</td>
              <td className="table-top">STATUS</td>
              <td className="table-top">COMPLETED</td>
            </tr>
            {pendingOrders.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{val.client}</td>
                  <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                  <td>{val.article}</td>
                  <td>{val.quantity}</td>
                  <td>{val.status}</td>
                  <td>
                    <button
                      className="order-completed"
                      onClick={() => handleClick(val.idorder)}
                    >
                      ORDER COMPLETED
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}
