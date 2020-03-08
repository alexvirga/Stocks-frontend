import React from "react";
import { Link } from "react-router-dom";
const Home = props => {
  return (
    <div className="Homepage">
      <div className="Homepage-background"></div>
      {/* <div style={{ display: "flex", flex: "1", minWidth: "300px" }}> */}
        {!props.loggedInStatus ? (
          <div className="Registration-Container">
            <div>
            <img src="pipe.png" className="pipe-logo" alt="" />
            <h1 className="Pipeline-title"> Pipeline Portfolios</h1>
</div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="box-1">
                <div className="btn btn-registration">
                  <span>Login</span>
                </div>
              </div>
            </Link>

            <br></br>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <div className="box-2">
                <div className="btn btn-registration">
                  <span> Sign Up</span>
                </div>
              </div>
            </Link>
            <br></br>
          </div>
        ) : null}
      </div>
    // </div>
  );
};
export default Home;
