import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { withUser } from "./Context/UserProvider";

import { PATHES } from "./Constants/routes";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={PATHES.HOME} exact>
          <Home />
        </Route>
        <Route path={PATHES.LOGIN}>
          <Login />
        </Route>
        <Route path={PATHES.REGISTER}>
          <Register />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default withUser(Router);
