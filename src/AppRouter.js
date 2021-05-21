import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Authorization } from "./layouts/authorization/authorization";
import { App } from "./layouts/App";

import { ProtectedRoute } from "./components/";

import "./app.scss";

function AppRouter() {
  const history = useHistory();
  // const [isAuth, setIsAuth] = useState(true);
  const isAuth = useSelector((state) => state.user.status);
  useEffect(() => {
    isAuth && history.push("/projects");
  }, [isAuth, history]);

  return (
    <Switch>
      <Route exact path="/" component={Authorization} />
      <ProtectedRoute path="/projects" isAuth={isAuth} component={App} />
    </Switch>
  );
}

export default AppRouter;
