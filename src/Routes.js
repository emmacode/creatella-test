import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import HomeScreen from "./views/Homescreen";
import Cart from "./views/Cart";

const Routes = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/cart" component={Cart} />
    </Switch>
  </Router>
);

export default Routes;
