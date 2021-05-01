import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ components, ...attrs }) => (
  <>
    {!attrs.isAuth ? (
      <Route
        render={() => {
          <Redirect to="/" />;
        }}
      />
    ) : (
      protectedRoute.map((el) => (
        <Route
          path={el.path}
          render={(props) => {
            const Component = el.component;
            return <Component {...props} />;
          }}
        />
      ))
    )}
  </>
);

// path="/app" isAuth={!isEmpty(user)} component={App}

// <Route
// {...attrs}
// render={(props) => (attrs.isAuth === true ? <Component {...props} /> : <Redirect to="/" />)}
// />
