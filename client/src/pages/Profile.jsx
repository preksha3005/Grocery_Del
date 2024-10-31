import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import OrderHistory from "./OrderHistory";
import Settings from "./Settings";

const Profile = () => {
  const [profile, setp] = React.useState();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (token) {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${token}`,
      };
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
  axios.defaults.withCredentials = true;
  return (
    <div className="prof bree-serif-regular">
      <Nav_User />
      <div className="sidebar">
        <p className="prof-icon">
          <RxAvatar style={{ width: "14vw", height: "14vh" }} />
        </p>
        {profile && (
          <div className="details-user">
            <p>{profile.name}</p>
            <br />
            <p>{profile.email}</p>
            <br />
            <p>{profile.address}</p>
            <br />
            <br />

            <br />
            <br />
            <br />
            {profile.role == "user" && (
              <div className="title-prof">
                <Link
                  to="/orderhistory"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Order History
                </Link>
                <Link
                  to="/settings"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Settings
                </Link>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Logout
                </Link>
              </div>
            )}

            {profile.role == "admin" && (
              <div className="title-prof">
                <Link
                  to="/allorders"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  All Orders
                </Link>
                <Link
                  to="/addprod"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add Product
                </Link>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
