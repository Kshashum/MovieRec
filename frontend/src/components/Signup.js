import React from "react";
import { Redirect } from "react-router-dom";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      done: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, password, email, firstname, lastname } = this.state;
    const data = {
      username: username,
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
      recommendedMovies: [],
      watchedMovies: [],
      login: true,
    };
    console.log("submitted");
    fetch("/api/v1/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.created) {
          this.setState({ done: true });
          this.props.handleLogin(data);
        }
      })
      .catch((err) => {
        console.log("error is :" + err.message);
      });
  }
  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    if (this.state.done) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className="container"
        style={{
          justifyContent: "center",
          backgroundColor: "#ffffff",
          width: "50%",
          marginTop: "3%",
          marginBottom: "10%",
          padding: "5% 2% 3% 2%",
          borderRadius: "2%",
          boxShadow: "10px 8px 10px -3px black",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <h3>Signup Form</h3>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              name="firstname"
            ></input>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              name="lastname"
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            ></input>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            ></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            ></input>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
export default Signup;
