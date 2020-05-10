import React from "react";
import Middeware from "./middlewares";
import { Switch, HashRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Middeware />
      </Switch>
    </HashRouter>
  );
};

export default React.memo(App);
