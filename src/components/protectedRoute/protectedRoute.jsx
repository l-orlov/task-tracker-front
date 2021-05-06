import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...attrs }) => (
  <Route
    {...attrs}
    render={(props) => (attrs.isAuth === true ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

// path="/app" isAuth={!isEmpty(user)} component={App}
