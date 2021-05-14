import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieContextProvider } from "./context/moviecontext";
ReactDOM.render(
  <Router>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>
  </Router>,
  document.getElementById("root")
);
