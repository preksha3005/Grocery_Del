import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const AllOrders = () => {
  const [orders, seto] = React.useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [userDetails, setUserDetails] = React.useState();
  const getUserDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/get-user-details/${orderId}`,
        {
          headers,
        }
      );
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getallorders", { headers })
      .then((response) => {
        console.log(response.data.data);
        seto(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const changestatus = async (orderId) => {
    const newStatus = prompt(`Enter new status for order ${orderId}: `);
    if (
      newStatus &&
      ["Order placed", "Out for delivery", "Delivered", "Canceled"].includes(
        newStatus
      )
    ) {
      try {
        const response = await axios.put(
          `http://localhost:3001/update-stat/${orderId}`,
          {
            status: newStatus,
          },
          { headers }
        );
        console.log(response.data);
        seto((prevOrders) =>
          prevOrders.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Invalid status. Please enter a valid status.");
    }
  };
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Nav_User />
      <div className="order-history-container">
        <h2>All Orders</h2>
        <br />
        {orders.length === 0 ? (
          <h2>No orders</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Books</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, i) => (
                  <tr key={order._id}>
                    <td>{i + 1}.</td>
                    <Link
                      to={`/view-details-user/${
                        order.product ? order.product._id : ""
                      }`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <td>{order.product ? order.product.name : "No Name"}</td>
                    </Link>
                    <td>
                      {order.product
                        ? order.product.desc.slice(0, 90) + "...."
                        : "No Description"}
                    </td>
                    <td>{order.product ? order.product.price : "N/A"}</td>
                    {order.status == "Order placed" && (
                      <td
                        style={{ color: "yellow" }}
                        onClick={() => changestatus(order._id)}
                      >
                        Order placed
                      </td>
                    )}
                    {order.status == "Out for delivery" && (
                      <td
                        style={{ color: "orange" }}
                        onClick={() => changestatus(order._id)}
                      >
                        Out for delivery
                      </td>
                    )}
                    {order.status == "Delivered" && (
                      <td
                        style={{ color: "#42A362" }}
                        onClick={() => changestatus(order._id)}
                      >
                        Delivered
                      </td>
                    )}
                    {order.status == "Canceled" && (
                      <td
                        style={{ color: "red" }}
                        onClick={() => changestatus(order._id)}
                      >
                        Canceled
                      </td>
                    )}
                    <td className="admin-user">
                      <IoNavigateCircleOutline
                        style={{ fontSize: "24px" }}
                        onClick={() => getUserDetails(order.user._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <br />
        {userDetails && (
          <div className="user-detail">
            <h2>User Details</h2>
            <br />
            <p>
              <u>Name</u> : {userDetails.name}
            </p>
            <p>
              <u>Email</u> : {userDetails.email}
            </p>
            <p>
              <u>Address</u> : {userDetails.address}
            </p>
            <br />
            <button className="close" onClick={() => setUserDetails()}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
