import React from "react";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div>
      <h1 style={{ color: "#ffffff" }}>
        Page can not be found, check out top movies
      </h1>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
}
export default PageNotFound;
