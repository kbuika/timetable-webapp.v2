import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="nomatch__div">
      <h1>
        404{" "}
        <span role="img" aria-label="hey">
          &#x1f622;
        </span>
      </h1>
      <p>You seem to be lost</p>
      <p>
        Go back{" "}
        <Link
          to="/3n-timetable"
          style={{ textDecoration: "none", color: "black" }}
        >
          <u>Home</u>
        </Link>
      </p>
    </div>
  );
}

export default NoMatch;
