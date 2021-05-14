import React from "react";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import TopMovies from "./components/TopMovies";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import PageNotFount from "./components/PageNotFound.js";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  return (
    <div style={{ backgroundColor: "#e50914" }}>
    <Header />
    <div
      style={{ backgroundColor: "#e50914", margin: "0", minHeight: "100%" }}
    >
      <Switch>
        <Route
          path="/"
          exact
          component={TopMovies}
        />
        <Route
          path="/recommendations"
          component={Recommendations}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/signup"
          component={Signup}
        />
        <Route component={PageNotFount} />
      </Switch>
    </div>
    <Footer />
  </div>
  )
}

export default App

