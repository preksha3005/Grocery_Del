import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import Navbar from "../Navbar";
const SignUp = () => {
  const [name, setn] = React.useState("");
  const [email, sete] = React.useState("");
  const [password, setp] = React.useState("");
  const [address, seta] = React.useState("");
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sign", { name, email, password, address })
      .then((result) => {
        // if (result.data.message) {
        //   console.log(result.data.message);
        //   alert(result.data.message);
        // } else {
        //   console.log(result.data);
        //   alert(result.data);
        // }
        console.log(result.data);
        console.log(result.data.message);
        if (result.data.status) navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Navbar />
      <div className="sign-cont">
        <div className="sign-box">
          <h1>SignUp</h1>
          <br />
          <br />
          <form onSubmit={handle} className="form">
            <input
              type="text"
              placeholder="Enter name"
              className="name"
              name="name"
              required
              onChange={(e) => setn(e.target.value)}
            />
            &emsp;
            <span className="icon">
              <FaUser />
            </span>
            <br />
            <br />
            <input
              type="email"
              placeholder="Enter email"
              className="email"
              name="email"
              required
              onChange={(e) => sete(e.target.value)}
            />
            &emsp;
            <span className="icon">
              <MdEmail />
            </span>
            <br />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              className="password"
              name="password"
              required
              onChange={(e) => setp(e.target.value)}
            />
            &emsp;
            <span className="icon">
              <RiLockPasswordFill />
            </span>
            <br />
            <br />
            <input
              type="text"
              placeholder="Enter address"
              className="address"
              name="address"
              required
              onChange={(e) => seta(e.target.value)}
            />
            &emsp;
            <span className="icon">
              <FaHome />
            </span>
            <br />
            <br />
            <button type="submit" className="reg">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
