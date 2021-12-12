import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Pagination from "../components/Pagination";

import { Table, Button } from "react-bootstrap";
import Axios from "axios";

export default function Semielaborateds(props) {
  const [semielaborateds, setSemielaborateds] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidosPorPagina, setPedidosPorPagina] = useState(10);

  const indiceDelUltimoPedido = paginaActual * pedidosPorPagina;
  const indiceDelPrimerPedido = indiceDelUltimoPedido - pedidosPorPagina;
  const pedidosActuales = semielaborateds.slice(
    indiceDelPrimerPedido,
    indiceDelUltimoPedido
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const getSemielaborateds = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getinventory").then(
      (response) => {
        setSemielaborateds(response.data);
      }
    );
  };

  const updateStock = (id) => {
    const nuevoStock = prompt(
      "Ingresa nuevo stock del semielaborado seleccionado"
    );

    Axios.put("https://centralconoflex.herokuapp.com/updatematerialstock", {
      stock: nuevoStock,
      idmaterialstock: id,
    }).then((response) => {
      console.log("material updated");
    });
  };

  useEffect(() => {
    getSemielaborateds();
  }, [semielaborateds]);

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Codigo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosActuales.map((semielaborated) => (
              <tr key={semielaborated.idsemielaborateds}>
                <td>{semielaborated.name}</td>
                <td>{semielaborated.color}</td>
                <td>{semielaborated.stock}</td>
                <td>{semielaborated.code}</td>
                <td>
                  <Button
                    onClick={() =>
                      updateStock(semielaborated.idsemielaborateds)
                    }
                  >
                    Editar stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Pagination
            pedidosPorPagina={pedidosPorPagina}
            pedidosTotales={semielaborateds.length}
            paginate={paginate}
          />
        </Table>
      </div>
    </div>
  );
}
