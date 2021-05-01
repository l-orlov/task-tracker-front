import React from "react";
import { Switch } from "react-router-dom";

import { Authentication } from "./layouts/authentication/authentication";

import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";

const protectedRoute = [
  { path: "/app", component: <div>hello</div> },
  { path: "/app/1", component: <div>hello</div> },
];

function App() {
  return (
    <div className="App">
      <Authentication />
    </div>
  );
}

export default App;
