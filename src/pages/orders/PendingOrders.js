import React, { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Button } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";
import NavbarComponent from "../../components/NavbarComponent";
import Pagination from "../../components/Pagination";

export default function PendingOrders() {
  const [filtro, setFiltro] = useState("todos");
  const [orders, setOrders] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidosPorPagina, setPedidosPorPagina] = useState(10);

  const indiceDelUltimoPedido = paginaActual * pedidosPorPagina;
  const indiceDelPrimerPedido = indiceDelUltimoPedido - pedidosPorPagina;
  const pedidosActuales = orders.slice(
    indiceDelPrimerPedido,
    indiceDelUltimoPedido
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const getOrders = () => {
    Axios.get("https://centralconoflex.herokuapp.com/getallorders").then(
      (response) => {
        if (filtro === "todos") {
          setOrders(response.data);
        } else if (filtro === "encoladeproduccion") {
          setOrders(
            response.data.filter(
              (pedido) => pedido.status === "En cola de produccion"
            )
          );
        } else if (filtro === "listoparaarmar") {
          setOrders(
            response.data.filter(
              (pedido) => pedido.status === "Listo para armar"
            )
          );
        } else if (filtro === "listoparadespachar") {
          setOrders(
            response.data.filter(
              (pedido) => pedido.status === "Listo para despachar"
            )
          );
        } else if (filtro === "despachado") {
          setOrders(
            response.data.filter((pedido) => pedido.status === "Despachado")
          );
        }
      }
    );
  };

  const handleActualizar = (index, status) => {
    console.log(index);
    Axios.put("https://centralconoflex.herokuapp.com/updateorder", {
      idorder: index,
      status: status,
    }).then((response) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    //console.log(pendingOrders)
    getOrders();
  }, [orders]);

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        <div className="mb-3">
          <Button size="sm" className="mx-1" onClick={() => setFiltro("todos")}>
            Todos
          </Button>
          <Button
            size="sm"
            className="mx-1"
            onClick={() => setFiltro("encoladeproduccion")}
          >
            En cola de produccion
          </Button>
          <Button
            size="sm"
            className="mx-1"
            onClick={() => setFiltro("listoparaarmar")}
          >
            Listo para armar
          </Button>
          <Button
            size="sm"
            className="mx-1"
            onClick={() => setFiltro("listoparadespachar")}
          >
            Listo para despachar
          </Button>
          <Button
            size="sm"
            className="mx-1"
            onClick={() => setFiltro("despachado")}
          >
            Despachado
          </Button>
        </div>
        <h6 className="mt-4">Cantidad de items en la lista: {orders.length}</h6>
        <Table responsive="sm" className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Articulo</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pedidosActuales.map((pedido) => (
              <tr key={pedido.idorder}>
                <td>{moment(pedido.date).format("L")}</td>
                <td>{pedido.client}</td>
                <td>{pedido.article}</td>
                <td>{pedido.quantity}</td>
                <td>{pedido.status}</td>
                <td>
                  <DropdownButton
                    size="sm"
                    title="Acciones"
                    id="bg-nested-dropdown"
                  >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() =>
                        handleActualizar(
                          pedido.idorder,
                          "En cola de produccion"
                        )
                      }
                    >
                      En produccion
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() =>
                        handleActualizar(pedido.idorder, "Listo para armar")
                      }
                    >
                      Para armar
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onClick={() =>
                        handleActualizar(pedido.idorder, "Listo para despachar")
                      }
                    >
                      Para despachar
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="4"
                      onClick={() =>
                        handleActualizar(pedido.idorder, "Despachado")
                      }
                    >
                      Despachado
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
          <Pagination
            pedidosPorPagina={pedidosPorPagina}
            pedidosTotales={orders.length}
            paginate={paginate}
          />
        </Table>
      </div>
    </div>
  );

  /*
    <div className="pendingorders-table">
        <h3>{pendingOrders.length} artículos en producción</h3>
        <table>
          <tbody>
            <tr>
              <td className="table-top">CLIENT</td>
              <td className="table-top">DATE</td>
              <td className="table-top">ARTICLE</td>
              <td className="table-top">QUANTITY</td>
              <td className="table-top">STATUS</td>
              <td className="table-top">COMPLETED</td>
            </tr>
            {pendingOrders.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{val.client}</td>
                  <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                  <td>{val.article}</td>
                  <td>{val.quantity}</td>
                  <td>{val.status}</td>
                  <td>
                    <button
                      className="order-completed"
                      onClick={() => handleClick(val.idorder)}
                    >
                      ORDER COMPLETED
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>*/
}
