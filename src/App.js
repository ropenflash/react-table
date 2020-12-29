import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Add from "./components/Add/Add";
import Edit from "./components/Edit/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/edit" component={Edit} />
        <Route path="/add" component={Add} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
