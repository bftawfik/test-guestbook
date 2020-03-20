import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { PATHES } from "./Constants/routes";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const Router = props => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={PATHES.HOME} exact>
          <div>Home Page</div>
        </Route>
        <Route path={PATHES.LOGIN}>
          <div>Login Page</div>
        </Route>
        <Route path={PATHES.REGISTER}>
          <div>Register Page</div>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
