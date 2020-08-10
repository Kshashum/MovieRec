import React from "react";
import { NavLink } from "react-router-dom";
import Autocomplete from "react-autocomplete";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", suggestions: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleClick() {
    this.props.handleSearch("");
  }
  handleChange(event) {
    const { value } = event.target;
    if (value.length > 3) {
      fetch("/api/v1/autocomplete?search=" + value)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            suggestions: res.map((item) => {
              return item["Title"];
            }),
            search: value,
          });
        })
        .catch((err) => {
          console.log("error is :" + err.message);
        });
    } else {
      this.setState(() => {
        return { search: value, suggestions: [] };
      });
    }
  }
  handleSelect(val) {
    this.setState({ search: val });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.search);
    this.setState({ search: "" });
  }
  render() {
    return (
      <header style={{ backgroundColor: "#000000", height: "3rem" }}>
        <nav>
          <NavLink to="/">
            <button className="btn btn-danger" onClick={this.handleClick}>
              TopMovies
            </button>
          </NavLink>
          {" | "}
          <NavLink to="/recommendations">
            <button className="btn btn-danger" onClick={this.handleClick}>
              Recommendations
            </button>
          </NavLink>
          {" | "}
          {this.props.login ? (
            <NavLink to="/logout">
              <button className="btn btn-danger">Logout</button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-danger">Login</button>
            </NavLink>
          )}
          <form
            style={{ float: "right" }}
            className="form-inline"
            onSubmit={this.handleSubmit}
          >
            <div style={{ position: "relative", zIndex: "2" }}>
              <Autocomplete
                getItemValue={(item) => {
                  console.log(item);
                  return item;
                }}
                items={this.state.suggestions}
                value={this.state.search}
                name="search"
                onChange={this.handleChange}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                    }}
                  >
                    {item}
                  </div>
                )}
                onSelect={(val) => {
                  this.handleSelect(val);
                }}
                className="form-control mr-sm-2"
              ></Autocomplete>
            </div>{" "}
            <button className="btn btn-danger">Search</button>
          </form>
        </nav>
        <br />
      </header>
    );
  }
}
export default Header;
