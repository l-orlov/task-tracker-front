import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { Authentication } from "./layouts/authentication/authentication";
import { App } from "./layouts/App";

import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

import "./app.scss";

function AppRouter() {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    // isAuth && history.push("/tasks/1");
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Authentication} />
      <ProtectedRoute path="/projects" isAuth={isAuth} component={App} />
    </Switch>
  );
}

export default AppRouter;
