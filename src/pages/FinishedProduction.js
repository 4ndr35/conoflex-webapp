import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";

import Production from "../components/Production";

export default function FinishedProduction(props) {
  const [articles, setArticles] = useState([]);
  const [material, setMaterial] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState(0);

  const today = Date();

  const [pendingProduction, setPendingProduction] = useState([]);

  const getInventory = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getinventory").then((response) => {
      setArticles(response.data);
    });
  };

  const getMaterialStock = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getmaterialstock").then((response) => {
      setMaterial(response.data);
    });
  };

  const getPendingProduction = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getpendingproduction").then((response) => {
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
    console.log(moment().format('dddd DD/MM/YYYY'))
    console.log(pendingProduction)
  };

  const handleClick = (idArticle, idMaterial) => {
    Axios.post("https://centralconoflex.herokuapp.com/createproduction", {
      employee: props.userName,
      article: articles[idArticle].name,
      material:
        material[idMaterial].provider +
        " " +
        material[idMaterial].color +
        " " +
        material[idMaterial].code,
      quantity: Number(quantity),
      weight: Number(weight)
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
    <div className="employees">
      <div className="form">
        <label>Seleccionar artículo</label>
        <select name="name" id="select-article">
          {articles.map((article, key) => {
            return (
              <option key={key} value={key}>
                {article.name}
              </option>
            );
          })}
        </select>
        <label>Seleccionar material</label>
        <select name="material" id="select-material">
          {material.map((material, key) => {
            return (
              <option key={key} value={key}>
                {material.material} {material.color} {material.code}{" "}
                {material.provider}
              </option>
            );
          })}
        </select>
        <label>Cantidad fabricada</label>
        <input
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
          name="quantity"
          type="number"
          placeholder="Cantidad"
        />
        <label>Peso del artículo</label>
        <input
          onChange={(event) => {
            setWeight(event.target.value);
          }}
          name="weight"
          type="number"
          placeholder="Peso"
        />
        <button
          onClick={() =>
            handleClick(
              document.getElementById("select-article").value,
              document.getElementById("select-material").value
            )
          }
        >
          Confirmar producción
        </button>
      </div>
      <div className="list-employees">
        <h4>Últimas producciones realizadas</h4>
        <div className="employees-box">
          {pendingProduction.slice(0, 9).map((val, key) => {
            return (
              <div>
                <Production
                  employee={val.employee}
                  key={val.idproduction}
                  article={val.article}
                  date={moment().format('dddd DD/MM/YYYY')}
                  weight={val.weight}
                  material={val.material}
                  quantity={val.quantity}
                  confirmed={val.confirmed}
                />
                {props.role === "admin" ? (
                  <button
                    onClick={() =>
                      confirmProduction(val.article, val.quantity)
                    }
                  >
                    CONFIRMAR
                  </button>
                ) : (
                  console.log()
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
