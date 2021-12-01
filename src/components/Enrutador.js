import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

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

export default function Enrutador(props) {
  return (
    <Router>
      {props.loginStatus ? <NavbarComponent /> : ""}
      <Switch>
        {/* ORDERS */}
        <Route path="/load-order">
          <LoadOrder
            loginStatus={props.loginStatus}
            setLoginStatus={props.setLoginStatus}
            setUserName={props.setUserName}
            setPassword={props.setPassword}
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
          <FinishedProduction userName={props.userName} />
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
          />
        </Route>
      </Switch>
    </Router>
  );
}
