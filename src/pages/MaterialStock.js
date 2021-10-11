import React, { useEffect, useState } from "react";
import Axios from "axios";

import "../styles/Stock.css";

export default function MaterialStock() {
  const [materialStock, setMaterialStock] = useState([]);
  const [inputStock, setInputStock] = useState(false);
  const [updatedStock, setUpdatedStock] = useState(0);

  const getMaterialStock = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getmaterialstock").then((response) => {
      setMaterialStock(response.data);
    });
  };

  const editStock = (key) => {
    console.log(key)
    setInputStock(!inputStock);
  };

  const updateStock = (id) => {
    editStock();
    Axios.put("https://centralconoflex.herokuapp.com/updatematerialstock", {stock: updatedStock, idmaterialstock: id}).then((response) => {
      console.log('material updated')
    })
  }

  useEffect(() => {
    getMaterialStock();
  }, [materialStock, inputStock]);

  return (
    <div className="material-table">
      <table>
        <tbody>
          <tr>
            <td className="table-top">MATERIAL</td>
            <td className="table-top">COLOR</td>
            <td className="table-top">CODE</td>
            <td className="table-top">PROVIDER</td>
            <td className="table-top">STOCK</td> 
            <td className="table-top">ACTION</td>
          </tr>
          {materialStock.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.material}</td>
                <td>{val.color}</td>
                <td>{val.code}</td>
                <td>{val.provider}</td>
                <td>
                  {val.stock}
                  {inputStock ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Quantity"
                        onChange={(event) => {
                          setUpdatedStock(event.target.value);
                        }}
                      />
                      <button onClick={() => {updateStock(val.idmaterialstock)}}>Update</button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <button onClick={() => editStock(key)}>
                    {inputStock ? "CANCEL" : "EDIT STOCK"}
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
