import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProd = () => {
    const navigate=useNavigate();
  const [data, setd] = React.useState({
    url: "",
    name: "",
    category: "",
    price: "",
    desc: "",
    rating: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = async (e) => {
    const { name, value } = e.target;
    setd({ ...data, [name]: value });
  };

  const submit = async () => {
    const res = await axios.post("http://localhost:3001/addprod", data, {
      headers,
    });
    setd({ url: "", title: "", author: "", price: "", desc: "", language: "" });
    console.log(res.data);
    navigate("/allprodUser")
  };
  return (
    <div>
      <Nav_User />
      <div className="add-contain">
        <h2>Add Product</h2>
        <br />
        <div className="add-form">
          <input
            type="text"
            placeholder="Url of product"
            className="add-book-ip"
            required
            name="url"
            value={data.url}
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Name of product"
            className="add-book-ip"
            required
            name="name"
            value={data.title}
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Category of product"
            className="add-book-ip"
            required
            value={data.category}
            name="category"
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Price of product"
            className="add-book-ip"
            required
            value={data.price}
            name="price"
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Description of product"
            className="add-book-ip"
            required
            name="desc"
            value={data.desc}
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Rating of product"
            className="add-book-ip"
            required
            name="rating"
            value={data.rating}
            onChange={change}
          ></input>
          <br />
          <br />
          <button className="add-book-btn" onClick={submit}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProd;
