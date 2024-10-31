import React from "react";
import Navbar from "../Navbar";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="box-cont">
        <div className="box">
          <h1>Fresh Delivered Right to Your Door</h1>
          <br />
          <p>
            Get Fresh Groceries Delivered to Your Doorstep! Experience the
            convenience of online grocery shopping with us. No more traffic
            jams, parking hassles, or long queues. Shop from the comfort of your
            home and get same-day delivery. Fresh produce, meat, dairy, and more
            - we've got you covered. Start shopping today and taste the
            difference! Order now and experience the convenience of grocery
            delivery!
          </p>
        </div>
        &emsp;&emsp;&emsp;
        <div className="box1">
          <img
            src="https://i.pinimg.com/564x/a5/f7/7a/a5f77a668f289de391f889e07a06d709.jpg"
            alt="book"
            className="bookimg"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
