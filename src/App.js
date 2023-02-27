import "./App.css";
import Home from "./Routes/Home";
import { Routes, Route } from "react-router-dom";
import Product_Details from "./Routes/Product_Details/Product_Details";
import Shop from "./Routes/Shop/Shop";
import Cart from "./Routes/Cart/Cart";
import Checkout from "./Routes/Checkout/Checkout";
import Main from "./Routes/Admin/Main/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product_Details />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/payment-method" element={<Checkout />} />
        <Route path="/admin" element={<Main />} />
        <Route path="/admin/product/new" element={<Main />} />
        <Route path="/admin/categories/new" element={<Main />} />
        <Route path="/admin/categories/all" element={<Main />} />

        <Route path="/admin/products/all" element={<Main />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
