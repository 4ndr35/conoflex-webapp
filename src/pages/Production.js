import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Pagination from "../components/Pagination";

import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";

export default function Production(props) {
  const [productions, setProductions] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidosPorPagina, setPedidosPorPagina] = useState(10);

  const indiceDelUltimoPedido = paginaActual * pedidosPorPagina;
  const indiceDelPrimerPedido = indiceDelUltimoPedido - pedidosPorPagina;
  const pedidosActuales = productions.slice(
    indiceDelPrimerPedido,
    indiceDelUltimoPedido
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const getProductions = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getproduction").then(
      (response) => {
        setProductions(response.data);
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
    getProductions();
  }, [productions]);

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Articulo</th>
              <th>Material</th>
              <th>Cantidad</th>
              <th>Peso</th>
              <th>Operario</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {pedidosActuales.map((production) => (
              <tr key={production.idproduction}>
                <td>{moment(production.date).add(1, 'day').format("DD/MM/YYYY")}</td>
                <td>{production.article}</td>
                <td>{production.material}</td>
                <td>{production.quantity}</td>
                <td>{production.weight}</td>
                <td>{production.employee}</td>
                <td>
                  <Button onClick={() => updateStock(production.idproduction)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Pagination
            pedidosPorPagina={pedidosPorPagina}
            pedidosTotales={productions.length}
            paginate={paginate}
          />
        </Table>
      </div>
    </div>
  );
}
