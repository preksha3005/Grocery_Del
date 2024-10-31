import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home_User from "./pages/Home_User";
import OrderHistory from "./pages/OrderHistory";
import Settings from './pages/Settings'
import AllProducts from "./pages/AllProducts";
import AllProducts_User from "./pages/AllProducts_User";
import ViewProd from "./pages/ViewProd";
import ViewProd_User from "./pages/ViewProd_User";
import Cart from "./pages/Cart";
import AllOrders from "./pages/AllOrders";
import AddProd from "./pages/AddProd";
import UpdateProd from "./pages/UpdateProd";
// import NavigateUser from "./components/Profile/NavigateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/home" element={<Home_User />}></Route>
          <Route path="/orderhistory" element={<OrderHistory />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/allprod" element={<AllProducts />}></Route>
          <Route path="/allprodUser" element={<AllProducts_User/>}></Route>
          <Route path="/view-details/:id" element={<ViewProd/>}></Route>
          <Route path="/view-details-user/:id" element={<ViewProd_User/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/allorders" element={<AllOrders/>}></Route>
          <Route path="/addprod" element={<AddProd/>}></Route>
          <Route path="/updateprod/:id" element={<UpdateProd/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
