import React from "react";
import { Link, Redirect } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", login: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState(() => {
      return { [name]: value };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(
      "/api/v1/Users?email=" +
        this.state.email +
        "&password=" +
        this.state.password
    )
      .then((res) => res.json())
      .then((res) => {
        let results = res.map((item) => item);
        if (results[0]["login"]) {
          this.setState({ login: true });
          this.props.handleLogin(results[0]);
        } else {
          console.log("wrong username or password");
        }
      })
      .catch((err) => {
        console.log("error is :" + err.message);
      });
  }
  render() {
    if (this.state.login) {
      return <Redirect to="/" />;
    } else {
      return (
        <div
          className="container"
          style={{
            justifyContent: "center",
            backgroundColor: "#ffffff",
            width: "50%",
            marginTop: "10%",
            marginBottom: "10%",
            padding: "5% 2% 5% 2%",
            borderRadius: "2%",
            boxShadow: "0 8px 10px -3px black",
          }}
        >
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="something@mail.com"
                value={this.email}
                onChange={this.handleChange}
                name="email"
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.password}
                onChange={this.handleChange}
              ></input>
            </div>
            <button className="btn btn-primary">Submit</button>
            {"  |  "}
            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
          </form>
        </div>
      );
    }
  }
}
export default Login;
