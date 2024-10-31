import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, seto] = React.useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getorderhistory", { headers })
      .then((res) => {
        console.log(res.data.data);
        seto(res.data.data)
      });
  }, []);
  return (
    <div>
      <Nav_User />
      <div className="order-history-container">
      <br/>
        <h2>Your Order History</h2>
        <br />
        {orders.length === 0 ? (
          <p>No orders found.</p> // Display a message if there are no orders
        ) : (
        <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Products</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
          <tbody>
            {orders &&
              orders.map((order, i) => (
                <tr key={order.product._id}>
                  <td>{i + 1}.</td>
                  {/*<Link
                    to={`/view-details-user/${order.product._id}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >*/}
                    <td>{order.product.name}</td>
                  {/*</Link>*/}
                  <td className="desc-order-history">
                    {order.product.desc.slice(0, 90)}....
                  </td>
                  {/* Trimming long description */}
                  <td>{order.product.price}</td>
                  {order.status == "Order placed" && (
                    <td style={{ color: "yellow"}}>Order placed</td>
                  )}
                  {order.status == "Out for delivery" && (
                    <td style={{ color: "orange" }}>Out for delivery</td>
                  )}
                  {order.status == "Delivered" && (
                    <td style={{ color: "green" }}>Delivered</td>
                  )}
                  {order.status == "Canceled" && (
                    <td style={{ color: "red" }}>Canceled</td>
                  )}
                  <td>COD</td>
                </tr>
              ))}
          </tbody>
        </table>
            )}
      </div>
    </div>
  );
};

export default OrderHistory;
