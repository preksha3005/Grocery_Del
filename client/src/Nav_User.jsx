import React from "react";
import img1 from "./assets/logo3.png";
import axios from "axios";

const Navbar = () => {
  const [profile, setp] = React.useState();
  const [cartc, setCartc] = React.useState(0);
  const token = localStorage.getItem("token");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${token}`,
  };
  React.useEffect(() => {
    if (token) {
      const fetch = async () => {
        try {
          const response = await axios.get("http://localhost:3001/getuser", {
            headers,
          });
          console.log(response.data.detail);
          setp(response.data.detail);
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            window.location.href = "/login";
          }
        }
      };
      fetch();
    }
  }, [token]);

  React.useEffect(()=>{
    if(token){
      const fetch=async()=>{
        const res=await axios.get("http://localhost:3001/getcartcount",{
          headers
        });
        console.log(res.data)
        setCartc(res.data.data);
      }
      fetch();
    }
  },[])
  axios.defaults.withCredentials = true;
  return (
    <div className="josefin-sans">
      <nav>
        <div className="nav1">
          <img src={img1} alt="book" className="logo"></img>&emsp;
          <span className="text-logo">
            <b>FoodHeaven</b>
          </span>
        </div>
        <div className="nav2 user-nav">
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/allprodUser">All Products</a>
            </li>
          </ul>
        </div>
      </nav>
      <span className="signbtn">
        {profile && profile.role == "user" && (
          <button className="logsign">
            <a href="/cart">Cart ({cartc})</a>
          </button>
        )}
        {/*{profile && profile.role == "admin" && (
          <button className="user-btn">
          <a href="/">Logout</a>
        </button>
        )}*/}
        <button className="logsign">
          <a href="/profile">Profile</a>
        </button>
      </span>
    </div>
  );
};

export default Navbar;
