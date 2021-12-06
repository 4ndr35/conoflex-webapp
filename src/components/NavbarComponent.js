import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function NavbarComponent() {
  return (
    <div>
      <Navbar bg="warning" expand="lg">
        <Container>
          <Navbar.Brand href="home">Conoflex-Webapp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="finished-production">Producciones</Nav.Link>
              <NavDropdown title="Pedidos" id="basic-nav-dropdown">
                <NavDropdown.Item href="load-order">
                  Cargar pedidos
                </NavDropdown.Item>
                <NavDropdown.Item href="pending-orders">
                  Lista de pedidos
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Stock" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Semielaborados
                </NavDropdown.Item>
                <NavDropdown.Item href="material-stock">Material</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ordenes de compra" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Cargar orden de compra
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Lista de ordenes de compra</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
