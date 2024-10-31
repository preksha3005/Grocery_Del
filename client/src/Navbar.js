import React from "react";
import img1 from "./assets/food-logo.png";
import img2 from "./assets/logo2.png";
import img3 from "./assets/logo3.png";
import axios from "axios";
const Navbar = () => {
  return (
    <div className="josefin-sans">
      <nav>
        <div className="nav1">
          <img src={img3} alt="food" className="logo"></img>&emsp;
          <span className="text-logo">
            <b>FreshHeaven</b>
          </span>
        </div>
        <div className="nav2">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/allprod">All Products</a>
            </li>
          </ul>
        </div>
      </nav>
      <span className="signbtn">
        <button className="logsign">
          <a href="/login">LogIn</a>
        </button>
        <button className="logsign">
          <a href="/signup">SignUp</a>
        </button>
        &emsp;
      </span>
    </div>
  );
};

export default Navbar;
