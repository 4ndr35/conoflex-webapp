import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../pages/Home";
import LoadOrder from "../pages/orders/LoadOrder";
import PendingOrders from "../pages/orders/PendingOrders";
import CompletedOrders from "../pages/orders/CompletedOrders";
import DeliveredOrders from "../pages/orders/DeliveredOrders";
import FinishedProduction from "../pages/FinishedProduction";
import ToProduce from "../pages/ToProduce";
import Employees from "../pages/Employees";
import Stock from "../pages/MaterialStock";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";

import "../styles/Navbar.css";

import downarrow from "../assets/down-arrow.svg";
import home from "../assets/home.svg";
import orders from "../assets/orders.svg";
import load_order from "../assets/load-order.svg";
import pending_orders from "../assets/pending-orders.svg";
import completed_orders from "../assets/completed-orders.svg";
import delivered_orders from "../assets/delivered-orders.svg";
import production from "../assets/production.svg";
import to_produce from "../assets/to-produce.svg";
import finished_production from "../assets/finished-production.svg";
import employees from "../assets/employees.svg";
import inventory from "../assets/inventory.svg";
import material_stock from "../assets/material-stock.svg";
import logo_conoflex from "../assets/logo_conoflex.svg";

export default function Navbar(props) {


  return (
    <Router>
      {props.loginStatus ? (
          <div className="navbar">
            <div className="logo">
              <a href="/">
                <img
                  alt="logo conoflex"
                  src={logo_conoflex}
                  width={180}
                  className="conoflex_logo"
                />
              </a>
            </div>
          

          <ul className="items">
            <li>
              <Link to="/home" className="link_home">
                <img alt="home" src={home} width={24} className="home_logo" />{" "}
                Home
              </Link>
            </li>

            <li>
              <div className="orders_menu">
                <img
                  alt="load order"
                  src={orders}
                  width={24}
                  className="orders_logo"
                />
                Orders
                <img
                  alt="down arrow"
                  src={downarrow}
                  width={12}
                  className="orders_downarrow"
                />
              </div>
              <ul className="sub-menu">
                <li>
                  <Link to="/load-order" className="link_loadorder">
                    <img
                      alt="load order"
                      src={load_order}
                      width={24}
                      className="loadorder_logo"
                    />
                    Load Order
                  </Link>
                </li>
                <li>
                  <Link to="/pending-orders" className="link_pendingorders">
                    <img
                      alt="pending orders"
                      src={pending_orders}
                      width={24}
                      className="pendingorders_logo"
                    />
                    Pending Orders
                  </Link>
                </li>
                <li>
                  <Link to="/completed-orders" className="link_completedorders">
                    <img
                      alt="completed orders"
                      src={completed_orders}
                      width={24}
                      className="completedorders_logo"
                    />
                    Completed Orders
                  </Link>
                </li>
                <li>
                  <Link to="/delivered-orders" className="link_deliveredorders">
                    <img
                      alt="delivered orders"
                      src={delivered_orders}
                      width={24}
                      className="deliveredorders_logo"
                    />
                    Delivered Orders
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div className="production_menu">
                <img
                  alt="load order"
                  src={production}
                  width={24}
                  className="production_logo"
                />
                Production
                <img
                  alt="down arrow"
                  src={downarrow}
                  width={12}
                  className="production_downarrow"
                />
              </div>
              <ul className="sub-menu">
                <li>
                  <Link to="/to-produce" className="link_toproduce">
                    <img
                      alt="to producer"
                      src={to_produce}
                      width={24}
                      className="toproduce_logo"
                    />
                    To Produce
                  </Link>
                </li>
                <li>
                  <Link
                    to="/finished-production"
                    className="link_finishedproduction"
                  >
                    <img
                      alt="finished production"
                      src={finished_production}
                      width={24}
                      className="finishedproduction_logo"
                    />
                    Finished Production
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/employees" className="link_employees">
                <img
                  alt="employees"
                  src={employees}
                  width={24}
                  className="employees_logo"
                />
                Employees
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="link_inventory">
                <img
                  alt="inventory"
                  src={inventory}
                  width={24}
                  className="inventory_logo"
                />
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/material-stock" className="link_materialstock">
                <img
                  alt="material stock"
                  src={material_stock}
                  width={24}
                  className="materialstock_logo"
                />
                Material Stock
              </Link>
            </li>
          </ul>
        </div>
       
      ) : (
        <div></div>
      )}

      <Switch>
        {/* ORDERS */}
        <Route path="/load-order">
          <LoadOrder
            loginStatus={props.loginStatus}
            setLoginStatus={props.setLoginStatus}
            setUserName={props.setUserName}
            setPassword={props.setPassword}
            role={props.role}
            setRole={props.setRole}
          />
        </Route>
        <Route path="/pending-orders">
          <PendingOrders />
        </Route>
        <Route path="/completed-orders">
          <CompletedOrders />
        </Route>
        <Route path="/delivered-orders">
          <DeliveredOrders />
        </Route>
        {/* PRODUCTION */}
        <Route path="/to-produce">
          <ToProduce />
        </Route>
        <Route path="/finished-production">
          <FinishedProduction role={props.role} userName={props.userName} />
        </Route>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route path="/material-stock">
          <Stock />
        </Route>
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Login
            userName={props.userName}
            setUserName={props.setUserName}
            password={props.password}
            setPassword={props.setPassword}
            loginStatus={props.loginStatus}
            setLoginStatus={props.setLoginStatus}
            role={props.role}
            setRole={props.setRole}
          />
        </Route>
      </Switch>
    </Router>
  );
}
