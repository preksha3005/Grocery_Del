import React from "react";
import Nav_User from "../Nav_User";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProd = () => {
    const navigate=useNavigate()
//   const [data, setd] = React.useState({
//     url: "",
//     name: "",
//     category: "",
//     price: "",
//     desc: "",
//     rating: "",
//   });
  const [prod, setp] = React.useState({});
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = async (e) => {
    const { name, value } = e.target;
    // setd({ ...data, [name]: value });
    setp({...prod,[name]:value});
  };
  React.useEffect(()=>{
    if (id) {
        axios
          .get(`http://localhost:3001/getprod/${id}`)
          .then((res) => {
            console.log(res.data.data);
            setp(res.data.data);
          })
          .catch((err) => alert("Error"));
      }
  },[])

  const submit = async () => {
    const res = await axios.put(`http://localhost:3001/updateprod/${id}`, prod, {
      headers,
    });
    // setd({ url: "", title: "", author: "", price: "", desc: "", language: "" });
    console.log(res.data);
    navigate("/allprodUser")
  };
  return (
    <div>
      <Nav_User />
      <div className="add-contain">
        <h2>Update Product</h2>
        <br />
        <div className="add-form">
          <input
            type="text"
            placeholder="Url of product"
            className="add-book-ip"
            required
            name="url"
            value={prod.url}
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
            value={prod.name}
            onChange={change}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="Category of book"
            className="add-book-ip"
            required
            value={prod.category}
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
            value={prod.price}
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
            value={prod.desc}
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
            value={prod.rating}
            onChange={change}
          ></input>
          <br />
          <br />
          <button className="add-book-btn" onClick={submit}>
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProd;
