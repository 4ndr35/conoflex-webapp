import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Axios from "axios";
import moment from "moment";

export default function FinishedProduction(props) {
  const [articles, setArticles] = useState([]);
  const [material, setMaterial] = useState([]);
  const [productions, setProductions] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState("");
  const [worker, setWorker] = useState("");
  const [weight, setWeight] = useState(0);
  const [idMaterial, setIDMaterial] = useState(0);

  const getInventory = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getinventory").then(
      (response) => {
        setArticles(response.data);
      }
    );
  };

  const getProductions = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getproduction").then(
      (response) => {
        setProductions(response.data);
      }
    );
  };

  const getMaterialStock = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getmaterialstock").then(
      (response) => {
        setMaterial(response.data);
      }
    );
  };

  /*
  const updateStock = (idArticle, newQuantityArticle) => {
    Axios.put("https://centralconoflex.herokuapp.com/updateinventory", {
      stock: newQuantityArticle,
      idarticle: idArticle
    }).then((response) => {
      console.log(newQuantityArticle);
    });
  };
  */

  const updateMaterialStock = (idMaterial, newQuantityMaterial) => {
    Axios.put("https://centralconoflex.herokuapp.com/updatematerialstock", {
      stock: newQuantityMaterial,
      idmaterialstock: idMaterial,
    }).then((response) => {
      console.log("material updated");
    });
  };

  const handleClick = (idArticle) => {
    const newStock = Number(articles[idArticle].stock) + Number(quantity);
    console.log(newStock);
    console.log(articles[idArticle].stock);
    Axios.post("https://centralconoflex.herokuapp.com/createproduction", {
      employee: worker,
      article: articles[idArticle].name,
      material:
        material[idMaterial].provider +
        " " +
        material[idMaterial].color +
        " " +
        material[idMaterial].code,
      quantity: Number(quantity),
      weight: Number(weight),
      date: date,
    }).then(() => {
      console.log("success");
    });

    Axios.put("https://centralconoflex.herokuapp.com/updateinventory", {
      stock: newStock,
      idsemielaborated: Number(idArticle) + 1,
    }).then((response) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    getInventory();
    getMaterialStock();
    getProductions();
  }, [productions]);

  return (
    <div>
      <NavbarComponent />
      <Form className="container mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Operario</Form.Label>
          <Form.Control
            name="client"
            onChange={(event) => {
              setWorker(event.target.value);
            }}
            type="text"
            placeholder="Ingresa el operario"
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
          <Form.Label>ID Material</Form.Label>
          <Form.Control
            name="idMaterial"
            type="number"
            onChange={(event) => {
              setIDMaterial(event.target.value);
            }}
            placeholder="Ingresa el ID del material"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Articulo</Form.Label>
          <Form.Select name="article" type="select" id="select-article">
            {articles.map((article, key) => {
              return (
                <option key={key} value={key}>
                  {article.name} {article.color}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Peso</Form.Label>
          <Form.Control
            name="weight"
            type="number"
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            placeholder="Ingresa el peso"
          />
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

        <Button
          onClick={() =>
            handleClick(document.getElementById("select-article").value)
          }
          variant="primary"
        >
          Ingresar
        </Button>
      </Form>
      <div className="container mt-4">
        <h5>Ultimas producciones</h5>
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Articulo</th>
              <th>Material</th>
              <th>Cantidad</th>
              <th>Peso</th>
              <th>Operario</th>
            </tr>
          </thead>
          <tbody>
            {productions.slice(0, 5).map((val, key) => (
              <tr key={val.idproduction}>
                <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                <td>{val.article}</td>
                <td>{val.material}</td>
                <td>{val.quantity}</td>
                <td>{val.weight}</td>
                <td>{val.employee}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
