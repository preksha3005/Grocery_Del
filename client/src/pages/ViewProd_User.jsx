import React from "react";
import Nav_User from "../Nav_User";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { CiStar } from "react-icons/ci";

const ViewProd_User = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [data, setd] = React.useState(null);
  const [profile, setp] = React.useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${token}`,
    prodid: id,
  };

  React.useEffect(() => {
    console.log("Product ID:", id);
    axios
      .get(`http://localhost:3001/getprod/${id}`)
      .then((res) => {
        console.log("Response Data:", res.data);
        if (res.data.data) {
          setd(res.data.data);
        } else {
          console.error("Product not found");
          setd(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        alert("Failed to fetch product data.");
      });
  }, []);
  const del = async (id) => {
    const res = await axios.delete("http://localhost:3001/deleteprod", {
      headers,
    });
    console.log(res);
    alert(res.data.message);
    navigate("/allprodUser");
  };
  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3001/getuser", {
        headers,
      });
      console.log(response.data.detail);
      setp(response.data.detail);
    };
    fetch();
  }, []);

  const addcart = async () => {
    const res = await axios.put("http://localhost:3001/addtocart", null, {
      headers,
    });
    console.log(res.data.message);
    alert(res.data.message);
    navigate("/cart");
  };

  if (!data) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  axios.defaults.withCredentials = true;
  return (
    <div>
      <Nav_User />
      <div key={data.id} className="prod-details-card">
        <img src={data.url} alt="prodimg" className="det-card-prod-img"></img>
        <br />
        <div className="prod-det">
          <h3 className="prodtitle">{data.name}</h3>
          <p>{data.category}</p>
          <br />
          <p className="desc">{data.desc}</p>
          <br />
          <h3>Price: &#8377; {data.price}</h3>
          <br />
          <p>
            {data.rating}&nbsp;
            <CiStar />
          </p>
          <br />
          <br />
          {profile && profile.role == "user" && (
            <p className="cart-logo" onClick={addcart}>
              <FaShoppingCart />
              <span>Add to Cart</span>
            </p>
          )}

          {profile && profile.role == "admin" && (
            <span>
              <Link
                to={`/updateprod/${data._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <span className="upd-logo">
                  <FaEdit style={{ width: "10vw", fontSize: "25px" }} />
                </span>
              </Link>
              <span className="del-logo">
                <MdDelete
                  style={{ width: "10vw", fontSize: "30px", color: "red" }}
                  onClick={() => del(data._id)}
                />
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProd_User;
