import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate=useNavigate()
  const [profile, setp] = React.useState();
  const [value, setv] = React.useState({ address: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3001/getuser", { headers });
      console.log(res.data.detail);
      console.log(res.data.detail.address);
      setp(res.data.detail);
      setv({ address: res.data.detail.address });
    };
    fetch();
  }, []);
  const updateAdd = async () => {
    const res = await axios.put("http://localhost:3001/updateAdd", value, {
      headers,
    });
    console.log(res);
    // Update the profile state with the new address
    setp({ ...profile, address: value.address });
    alert(res.data.message)
    navigate("/profile")
  };

  const handleChange = (e) => {
    setv({ address: e.target.value });
  };
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Nav_User />
      <div className="setting">
        <h2>Settings</h2>
        <br />
        <br />
        {profile && (
          <>
            <div className="namemail">
              <h4>{profile.name}</h4>
              <h4>{profile.email}</h4>
            </div>
            <br />
            <br />
            <div className="upd">
              <textarea
                className="addupd"
                placeholder="Update address"
                // value={value}
                name="address"
                onChange={handleChange}
              ></textarea>
            </div>
            <br />
            <button className="upd-btn" onClick={updateAdd}>
              Update address
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
