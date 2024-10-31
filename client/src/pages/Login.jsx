import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import Navbar from "../Navbar";
const Login = () => {
  const [name, setn] = React.useState("");
  const [email, sete] = React.useState("");
  const [password, setp] = React.useState("");
  const [address, seta] = React.useState("");
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/loginapp", { email, password })
      .then((result) => {
        if (result.data.message) {
          console.log(result.data);
          console.log(result.data.message);
        } else {
          console.log(result.data);
          console.log(result.data);
        }
        if (result.data.status) navigate("/profile");
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);
      })
      .catch((err) => console.log(err));
  };
  axios.defaults.withCredentials = true;
  return (
    <>
      <Navbar />
      <div className="sign-cont">
        <div className="log-box">
          <h1>Login</h1>
          <br />
          <br />
          <form onSubmit={handle} className="formlog">
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
            <br />
            <button type="submit" className="reg">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
