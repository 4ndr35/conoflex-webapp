import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [inputStock, setInputStock] = useState(false);
  const [updatedStock, setUpdatedStock] = useState(0);

  const getInventory = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getinventory").then((response) => {
      setInventory(response.data);
    });
  };

  const editStock = (key) => {
    console.log(key)
    setInputStock(!inputStock);
  };

  const updateStock = (id) => {
    editStock();
    Axios.put("https://centralconoflex.herokuapp.com/updateinventory", {stock: updatedStock, idarticle: id}).then((response) => {
      console.log('updated')
    })
  }

  useEffect(() => {
    getInventory();
  }, [inventory, inputStock]);

  return (
    <div className="inventory-table">
      <table>
        <tbody>
          <tr>
            <td className="table-top">CODE</td>
            <td className="table-top">NAME</td>
            <td className="table-top">COLOR</td>
            <td className="table-top">STOCK</td>
            <td className="table-top">CATEGORY</td>
            <td className="table-top">MATERIAL</td>
            <td className="table-top">WEIGHT</td>
            <td className="table-top">BASE WEIGHT</td>
            <td className="table-top">ACTION</td>
          </tr>
          {inventory.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.code}</td>
                <td>{val.name}</td>
                <td>{val.color}</td>
                <td>
                  {val.stock}
                  {inputStock ? (
                    <div className="div-quantity">
                      <input
                        className="input-quantity"
                        type="text"
                        placeholder="Quantity"
                        onChange={(event) => {
                          setUpdatedStock(event.target.value);
                        }}
                      />
                      <button onClick={() => {updateStock(val.idarticle)}}>Update</button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td>{val.category}</td>
                <td>{val.material}</td>
                <td>{val.weight}</td>
                <td>{val.base}</td>
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
