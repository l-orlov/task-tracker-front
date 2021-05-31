import React, { useState } from "react";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";

import { TasksBoard } from "./tasksBoard/";
import { Projects } from "./projects";

import "./App.scss";
import logoSvg from "../logo.svg";

export const Navigation = ({ navigation }) => {
  return (
    <div className="navigation">
      <ul>
        {navigation.map((el) => (
          <li key={el.id}>
            <NavLink
              to={`${el.path}`}
              className="navigation__link"
              activeClassName="navigation__link--active"
            >
              <div>
                <span className="navigation__text">{el.title}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <div>
          <img src={logoSvg} alt="" />
          <p className="logo-smile">: )</p>
        </div>

        <p
          style={{
            fontWeight: "bold",
          }}
        >
          Task-Tracker
        </p>
      </div>
      <div className="header-user"></div>
    </div>
  );
};

export const App = () => {
  const { path } = useRouteMatch();
  const [navigation, setNavigation] = useState([]);

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Navigation navigation={navigation} />
        <div className="app-content">
          <Switch>
            <Route
              exact
              path={`${path}/`}
              render={() => <Projects setNavigation={setNavigation} />}
            />
            <Route
              path={`${path}/:id/board`}
              render={() => <TasksBoard setNavigation={setNavigation} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
