import React from "react";
import { Route } from "react-router";
import "./scss/app.scss";
import { Header } from "./Сomponents";
import { Home, Cart } from "./Pages";

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <Route path="/" render={() => <Home />} exact />
          <Route path="/cart" render={() => <Cart />} exact />
        </div>
      </div>
    </div>
  );
}

export default App;
