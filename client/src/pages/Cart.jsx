import React from "react";
import axios from "axios";
import Nav_User from "../Nav_User";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setc] = React.useState();
  const [tot, sett] = React.useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:3001/get-user-cart", {
          headers,
        });
        // console.log(res.data.data);
        console.log(res.data);
        setc(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [cart]);

  React.useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce(
        (sum, item) => sum + item.prodid.price * item.qty,
        0
      );
      sett(total);
    }
  }, [cart]);

  const deletebook = async (prodid) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/deleteprod/${prodid}`,
        { headers }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error deleting product:", error.response.data);
    }
  };

  const placeorder = async () => {
    const res = await axios.post(
      "http://localhost:3001/placeorder",
      { order: cart },
      { headers }
    );
    console.log(res);
    alert(res.data.message);
    navigate("/orderhistory");
  };

  axios.defaults.withCredentials = true;
  return (
    <div>
      <Nav_User />
      {cart && cart.length === 0 && (
        <div>
          <h2 className="nobook-cart">No product in cart</h2>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <br />
          <h2 className="carthead">Your Cart</h2>
          <br />
          <div className="cart-items">
            {cart.map((item, i) => {
              return (
                <div className="cart-item" key={i}>
                  <img
                    src={item.prodid.url}
                    alt="book"
                    className="cart-img"
                  ></img>
                  <div className="detail-cart">
                    <Link
                      to={`/view-details-user/${item.prodid._id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <h3>{item.prodid.name}</h3>
                      <p>{item.prodid.desc?.slice(0, 250)}...</p>
                      <br></br>
                      <p>&#8377; {item.prodid.price}</p>
                      <p>Quantity: {item.qty}</p>
                      <br />
                    </Link>
                    <p className="del">
                      <RiDeleteBin7Fill
                        style={{ width: "20px", fontSize: "20px" }}
                        onClick={() => deletebook(item.prodid._id)}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="total-amt">
          <div className="tot-det">
            <h2>Total Amount</h2>
            <p className="tot">
              <h3>{cart.length} Products</h3>
              <h3>&#8377; {tot}</h3>
            </p>
            <br />
            <button className="place" onClick={placeorder}>
              {" "}
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
