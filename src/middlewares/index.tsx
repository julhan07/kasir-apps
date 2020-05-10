import React from "react";
import { Route } from "react-router-dom";
import SidebarApp from "../components/sidebar";
import LoginPage from "../pages/login";
import jwtDecode from "jwt-decode";

import { getUserInfo } from "../actions/storage";

import { removeUserInfo } from "../actions/storage";

import routes from "../routes";
const AppMiddleware = () => {
  const { token, user } = getUserInfo();

  let loginStatus = token ? true : false;

  if (loginStatus) {
    let userToken = jwtDecode(token);
    let dateSystem = Math.round(new Date().getTime() / 1000);

    if (userToken.exp >= dateSystem) {
      return (
        <SidebarApp>
          {routes.map((route, i) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </SidebarApp>
      );
    } else {
      removeUserInfo();
      return <LoginPage />;
    }
  } else {
    return <LoginPage />;
  }
};

export default AppMiddleware;
