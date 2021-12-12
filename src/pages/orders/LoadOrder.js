import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";

import NavbarComponent from "../../components/NavbarComponent";

export default function LoadOrder(props) {
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const handleClick = (selectedArticle, idArticle) => {
    //document.getElementById("form").reset();
    Axios.post("https://centralconoflex.herokuapp.com/createorder", {
      client: client,
      date: date,
      article: selectedArticle,
      quantity: Number(quantity),
      status: status,
    }).then(() => {
      console.log("success");
    });

    /* YA NO SE USA MAS BASE DE DATOS PARA ARTICULOS
    Axios.put("https://centralconoflex.herokuapp.com/updateinventory", {
      stock: articles[idArticle].stock - quantity,
      idarticle: idArticle,
    }).then((response) => {
      console.log("updated");
    });
    */

    console.log(idArticle);
  };

  const getAllOrders = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getallorders").then(
      (response) => {
        setOrders(response.data);
      }
    );
  };

  useEffect(() => {
    getAllOrders();
  }, [orders]);

  return (
    <div>
      <NavbarComponent />
      <Form className="container mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cliente</Form.Label>
          <Form.Control
            name="client"
            onChange={(event) => {
              setClient(event.target.value);
            }}
            type="text"
            placeholder="Ingresa el cliente"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            name="date"
            type="date"
            onChange={(event) => {
              setDate(event.target.value);
            }}
            placeholder="Ingresa la fecha"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Articulo</Form.Label>
          <Form.Select name="article" type="select" id="select-article">
            {props.data.map((article, key) => {
              return (
                <option key={key} value={key}>
                  {article.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            name="quantity"
            type="number"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            placeholder="Ingresa la cantidad"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            name="status"
            type="select"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option>En cola de produccion</option>
            <option>Listo para armar</option>
            <option>Listo para despachar</option>
            <option>Despachado</option>
          </Form.Select>
        </Form.Group>
        <Button
          onClick={() =>
            handleClick(
              document.getElementById("select-article").options[
                document.getElementById("select-article").value
              ].text,
              document.getElementById("select-article").value
            )
          }
          variant="primary"
        >
          Ingresar
        </Button>
      </Form>
      <div className="container mt-4">
        <h5>Ultimos pedidos</h5>
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Articulo</th>
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((val, key) => (
              <tr key={val.idorder}>
                <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                <td>{val.client}</td>
                <td>{val.article}</td>
                <td>{val.quantity}</td>
                <td>{val.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
