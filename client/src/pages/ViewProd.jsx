import React from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiStar } from "react-icons/ci";

const ViewProd = () => {
  const [data, setd] = React.useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`http://localhost:3001/getprod/${id}`)
      .then((res) => {
        setd(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
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
        </div>
      </div>
    </div>
  );
};

export default ViewProd;
