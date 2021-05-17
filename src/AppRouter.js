import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { Authorization } from "./layouts/authorization/authorization";
import { App } from "./layouts/App";

import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

import "./app.scss";

function AppRouter() {
  // const history = useHistory();
  const [isAuth, setIsAuth] = useState(true);

  return (
    <Switch>
      <Route exact path="/" component={Authorization} />
      <ProtectedRoute path="/projects" isAuth={isAuth} component={App} />
    </Switch>
  );
}

export default AppRouter;
