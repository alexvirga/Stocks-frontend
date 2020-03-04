import React from 'react'
import axios from "axios";
import Login from "./registrations/Login"
import {Link} from 'react-router-dom'
const Home = (props) => {
  

return (
  <div className="Homepage">
    <div className="Homepage-background">
    </div>
    <div style={{display:"flex", flex:"1", minWidth:"300px"}}>
    { 
        !props.loggedInStatus ? 
        <div> 
        <Link to='/login'>Log In</Link>
        <br></br>
        <Link to='/signup'>Sign Up</Link>
        <br></br>
        </div>

        : null
      }
      

    </div>
    </div>
  );
};
export default Home;