import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Pagination from "../components/Pagination";

import { Table, Button } from "react-bootstrap";
import Axios from "axios";

export default function MaterialStock(props) {
  const [materialStock, setMaterialStock] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidosPorPagina, setPedidosPorPagina] = useState(10);

  const indiceDelUltimoPedido = paginaActual * pedidosPorPagina;
  const indiceDelPrimerPedido = indiceDelUltimoPedido - pedidosPorPagina;
  const pedidosActuales = materialStock.slice(
    indiceDelPrimerPedido,
    indiceDelUltimoPedido
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const getMaterialStock = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getmaterialstock").then(
      (response) => {
        setMaterialStock(response.data);
      }
    );
  };
  const updateStock = (id) => {
    const nuevoStock = prompt("Ingresa nuevo stock del material");

    Axios.put("https://centralconoflex.herokuapp.com/updatematerialstock", {
      stock: nuevoStock,
      idmaterialstock: id,
    }).then((response) => {
      console.log("material updated");
    });
  };

  useEffect(() => {
    getMaterialStock();
  }, [materialStock]);

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Material</th>
              <th>Proveedor</th>
              <th>Color</th>
              <th>Codigo</th>
              <th>Stock</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {pedidosActuales.map((material) => (
              <tr key={material.idmaterialstock}>
                <td>{material.idmaterialstock}</td>
                <td>{material.material}</td>
                <td>{material.provider}</td>
                <td>{material.color}</td>
                <td>{material.code}</td>
                <td>{material.stock}</td>
                <td>
                  <Button onClick={() => updateStock(material.idmaterialstock)}>
                    Editar stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Pagination
            pedidosPorPagina={pedidosPorPagina}
            pedidosTotales={materialStock.length}
            paginate={paginate}
          />
        </Table>
      </div>
    </div>
  );
}
