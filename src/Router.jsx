import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { withUser } from "./Context/UserProvider";

import { PATHES } from "./Constants/routes";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const Router = ({ user }) => {
    const { id } = user;

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={PATHES.HOME} exact>
          {id ? <Home /> : <Redirect to={PATHES.LOGIN} />}
        </Route>
        <Route path={PATHES.LOGIN}>
          {id ? <Redirect to={PATHES.HOME} /> : <Login />}
        </Route>
        <Route path={PATHES.REGISTER}>
          {id ? <Redirect to={PATHES.HOME} /> : <Register />}
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default withUser(Router);
