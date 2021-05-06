import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { Authentication } from "./layouts/authentication/authentication";
import { TasksBoard } from "./layouts/tasksBoard/tasksBoard";

import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

import "./app.scss";
import logoSvg from "./logo.svg";

function App() {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // isAuth && history.push("/tasks/1");
  }, []);

  return (
    <div className="App">
      <div className="logo">
        <div>
          <img src={logoSvg} />
          <p className="logo-smile">: )</p>
        </div>

        <p
          style={{
            fontSize: 39,
            fontWeight: "bold",
          }}
        >
          Task-Tracker
        </p>
      </div>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <ProtectedRoute path="/tasks/:id" isAuth={isAuth} component={TasksBoard} />
      </Switch>
    </div>
  );
}

export default App;
