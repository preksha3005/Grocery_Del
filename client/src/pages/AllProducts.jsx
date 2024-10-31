import React from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { CiStar } from "react-icons/ci";

const AllProducts = () => {
  const [prod, setp] = React.useState([]);
  const [category, setc] = React.useState([
    "Breads and buns",
    "Dairy",
    "Fruits and Vegetables",
    "Beverages",
    "Snacks",
  ]);
  const [selected, sets] = React.useState("");
  const handlechange = (e) => {
    sets(e);
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getallprod")
      .then((res) => {
        console.log(res.data.data);
        setp(res.data.data);
      })
      .catch((err) => alert("Error"));
  }, [prod]);

  const filtered=prod.filter((pr)=>
    selected===""?true:pr.category===selected
  )

  axios.defaults.withCredentials = true;
  return (
    <div className="cont">
      <Navbar />
      <h1>All Products</h1>
      <br></br>
      <div className="search">
        <select value={selected} onChange={(e) => handlechange(e.target.value)} className="select">
          <option value="">All Categories</option>
          {category.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <div className="grid-card">
        {filtered.length > 0 ? (
          filtered.map((pr) => (
            <Link
              to={`/view-details/${pr._id}`}
              style={{ textDecoration: "none" }}
            >
              <div key={pr.id} className="card">
                <img
                  src={pr.url}
                  alt="prod-img"
                  className="card-prod-img"
                ></img>
                <br />
                <h2 className="prodtitle">{pr.name}</h2>
                <br />
                {/*<p>By {pr.desc}</p>*/}
                <br />
                <p>{pr.category}</p>
                <br />
                <p>&#8377; {pr.price}</p>
                <br />
                <p>
                  {pr.rating} <CiStar />
                </p>
                <br />
              </div>
            </Link>
          ))
        ) : (
          <p className="noprod">No products available</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
