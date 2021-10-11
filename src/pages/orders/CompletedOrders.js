import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import "../../styles/orders/CompletedOrders.css";

export default function CompletedOrders() {
  const [completedOrders, setCompletedOrders] = useState([]);

  const getPendingOrders = () => {
    Axios.get("http://localhost:3001/completedorders").then((response) => {
      setCompletedOrders(response.data);
    });
  };

  const handleClick = (index) => {
    console.log(index);
    Axios.put("http://localhost:3001/updateorder", {
      idorder: index,
      status: "DELIVERED",
    }).then((response) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    //console.log(pendingOrders)
    getPendingOrders();
  }, [completedOrders]);

  return (
      <div className="completedorders-table">
        <table>
          <tbody>
            <tr>
              <td className="table-top">CLIENT</td>
              <td className="table-top">DATE</td>
              <td className="table-top">ARTICLE</td>
              <td className="table-top">QUANTITY</td>
              <td className="table-top">STATUS</td>
              <td className="table-top">DELIVERED</td>
            </tr>
            {completedOrders.map((val, index) => {
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
                      ORDER DELIVERED
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
