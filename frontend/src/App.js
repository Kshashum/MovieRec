import React from "react";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import TopMovies from "./components/TopMovies";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import PageNotFount from "./components/PageNotFound.js";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      topmovies: [],
      recommendedMovies: [],
      searchMovies: [],
      watchedMovies: [],
      _id: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.ChangeToWatched = this.ChangeToWatched.bind(this);
  }
  ChangeToWatched(event, imdbId) {
    event.preventDefault();
    if (this.state.login) {
      if (this.state.watchedMovies.includes(imdbId)) {
        const res = this.state.watchedMovies.filter((item) => item !== imdbId);
        this.setState({ watchedMovies: res });
      } else {
        let res = this.state.watchedMovies;
        res.push(imdbId);
        this.setState({ watchedMovies: res });
      }
    }
  }
  componentDidMount() {
    fetch("/api/v1/TopMovies")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ topmovies: data });
      })
      .catch((err) => {
        console.log("error is : " + err.message);
      });
  }
  handleLogout(val) {
    const data = {
      _id: this.state._id,
      watchedMovies: this.state.watchedMovies,
    };
    fetch("/api/v1/UsersUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => console.log("error is " + err.message));
    this.setState({
      login: val,
      recommendedMovies: [],
      watchedMovies: [],
      searchMovies: [],
    });
  }
  handleSearch(search) {
    if (search === "") {
      this.setState({ searchMovies: [] });
    } else {
      fetch("/api/v1/search?Title=" + search, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const result = res.map((item) => {
            return item;
          });
          this.setState({ searchMovies: result });
        });
    }
  }
  handleLogin(data) {
    this.setState({
      login: data["login"],
      recommendedMovies: data["recommendedMovies"],
      watchedMovies: data["watchedMovies"],
      _id: data["_id"],
    });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#e50914" }}>
        <Header handleSearch={this.handleSearch} login={this.state.login} />
        <div
          style={{ backgroundColor: "#e50914", margin: "0", minHeight: "100%" }}
        >
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <TopMovies
                  watchedMovies={this.state.watchedMovies}
                  topmovies={this.state.topmovies}
                  searchMovies={this.state.searchMovies}
                  handleSearch={this.handleSearch}
                  ChangeToWatched={this.ChangeToWatched}
                />
              )}
            />
            <Route
              path="/recommendations"
              component={() => (
                <Recommendations
                  watchedMovies={this.state.watchedMovies}
                  recommendedMovies={this.state.recommendedMovies}
                  searchMovies={this.state.searchMovies}
                  handleSearch={this.handleSearch}
                  ChangeToWatched={this.ChangeToWatched}
                />
              )}
            />
            <Route
              path="/login"
              component={() => <Login handleLogin={this.handleLogin} />}
            />
            <Route
              path="/logout"
              component={() => <Logout handleLogout={this.handleLogout} />}
            />
            <Route
              path="/signup"
              component={() => <Signup handleLogin={this.handleLogin} />}
            />
            <Route component={PageNotFount} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
