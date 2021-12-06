import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Axios from "axios";
import moment from "moment";

import Production from "../components/Production";

export default function FinishedProduction(props) {
  const [articles, setArticles] = useState([]);
  const [material, setMaterial] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState("");
  const [worker, setWorker] = useState("");
  const [weight, setWeight] = useState(0);

  const today = Date();

  const [pendingProduction, setPendingProduction] = useState([]);

  const getInventory = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getinventory").then(
      (response) => {
        setArticles(response.data);
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

  const getPendingProduction = () => {
    Axios.get(
      "https://centralconoflex.herokuapp.com/getpendingproduction"
    ).then((response) => {
      setPendingProduction(response.data);
    });
  };

  const updateStock = (idArticle, newQuantityArticle) => {
    Axios.put("https://centralconoflex.herokuapp.com/updateinventory", {
      stock: newQuantityArticle,
      idarticle: idArticle,
      weight: weight,
    }).then((response) => {
      console.log(newQuantityArticle);
    });
  };

  const updateMaterialStock = (idMaterial, newQuantityMaterial) => {
    Axios.put("https://centralconoflex.herokuapp.com/updatematerialstock", {
      stock: newQuantityMaterial,
      idmaterialstock: idMaterial,
    }).then((response) => {
      console.log("material updated");
    });
  };

  const confirmProduction = (article, productionQuantity) => {
    const articleNames = articles.map((article) => article.name);
    const idArticle = articleNames.indexOf(article);

    const newQuantityArticle =
      Number(articles[idArticle].stock) + Number(productionQuantity);
    //const newQuantityMaterial =
    //  Number(material[idMaterial].stock) - Number(weight) * Number(quantity);
    updateStock(idArticle, newQuantityArticle);
    //updateMaterialStock(idMaterial, newQuantityMaterial);
    console.log(moment().format("dddd DD/MM/YYYY"));
    console.log(pendingProduction);
  };

  const handleClick = (idArticle, idMaterial) => {
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
    }).then(() => {
      console.log("success");
    });

    /*
    Axios.put("http://localhost:3001/updateinventory", {
      stock: articles[idArticle].stock - quantity,
      idarticle: idArticle,
    }).then((response) => {
      console.log("updated");
    });
    */
  };

  useEffect(() => {
    getInventory();
    getMaterialStock();
    getPendingProduction();
  }, [pendingProduction]);

  return (
    <div>
      <NavbarComponent />
      <Form className="container mt-5">
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
          <Form.Label>Articulo</Form.Label>
          <Form.Select name="article" type="select" id="select-article">
            {pendingProduction.map((article, key) => {
              return (
                <option key={key} value={key}>
                  {article.name}
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
    </div>
  );
}
