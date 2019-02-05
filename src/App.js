import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Components/Home";
import Error from "./Components/Error";
import Detalhe from "./Components/Detalhe";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/detalhe" component={Detalhe} exact />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
