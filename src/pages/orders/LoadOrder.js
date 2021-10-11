import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";

import "../../styles/orders/LoadOrder.css";
import Order from "../../components/Order";
import Login from "../Login";

export default function LoadOrder(props) {
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [articles, setArticles] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleClick = (selectedArticle, idArticle) => {
    //document.getElementById("form").reset();
    Axios.post("http://localhost:3001/createorder", {
      client: client,
      date: date,
      article: selectedArticle,
      quantity: Number(quantity),
      status: "PENDING",
    }).then(() => {
      console.log("success");
    });

    Axios.put("http://localhost:3001/updateinventory", {
      stock: articles[idArticle].stock - quantity,
      idarticle: idArticle,
    }).then((response) => {
      console.log("updated");
    });

    console.log(idArticle);
    console.log(articles);
  };

  const getAllOrders = () => {
    Axios.get("http://localhost:3001/getallorders").then((response) => {
      setOrders(response.data);
    });
  };

  const getInventory = () => {
    Axios.get("http://localhost:3001/getinventory").then((response) => {
      setArticles(response.data);
    });
  };

  useEffect(() => {
    getAllOrders();
    getInventory();
  }, [orders]);

  return (
    <div className="orders">
      {props.loginStatus && props.role === "admin" ? (
        <>
          <div className="form" id="form">
            <h4>Ingresar nuevo pedido</h4>
            <label>Cliente</label>
            <input
              type="text"
              name="client"
              onChange={(event) => {
                setClient(event.target.value);
              }}
            />
            <label>Fecha</label>
            <input
              type="date"
              name="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <label>Artículo</label>
            <select name="article" id="select-article">
              {articles.map((article, key) => {
                return (
                  <option key={key} value={key}>
                    {article.name}
                  </option>
                );
              })}
            </select>
            <label>Cantidad</label>
            <input
              type="number"
              name="quantity"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
            <button
              onClick={() =>
                handleClick(
                  document.getElementById("select-article").options[
                    document.getElementById("select-article").value
                  ].text,
                  document.getElementById("select-article").value
                )
              }
            >
              Ingresar
            </button>
          </div>
          <div className="list-employees">
            <h4>Últimos pedidos ingresados</h4>
            <div className="employees-box">
              {orders.slice(0, 9).map((val, key) => {
                return (
                  <Order
                    key={val.idorder}
                    client={val.client}
                    date={moment(val.date).format("DD/MM/YYYY")}
                    article={val.article}
                    quantity={val.quantity}
                    status={val.status}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div>
          Permisos insuficientes
          <br />
          Se necesita ser admin para visualizar la seccion
          <br />
          <button>
            <a href="/">Loguearse</a>
          </button>
        </div>
      )}
    </div>
  );
}
