import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { Authentication } from "./layouts/authentication/authentication";
import { TasksBoard } from "./layouts/tasksBoard/tasksBoard";

import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

function App() {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    isAuth && history.push("/tasks/1");
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Authentication} />
        <ProtectedRoute path="/tasks/:id" isAuth={isAuth} component={TasksBoard} />
      </Switch>
    </div>
  );
}

export default App;
