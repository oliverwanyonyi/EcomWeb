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
import Dashboard from "./Routes/Dashboard/Dashboard";
import Register from "./Routes/Auth/Register";
import Login from "./Routes/Auth/Login";
import Sidebar from "./components/CategoriesSidebar/Sidebar";
import { AppState } from "./Store/store";
import SuccessfulPurchase from "./Routes/ThankYou/SuccessfulPurchase";
import Order_Details from "./Routes/Order_Details/Order_Details";

function App() {
  const { showCategories } = AppState();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Product_Details />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard/profile" element={<Dashboard />} />
        <Route path="/dashboard/orders" element={<Dashboard />} />

        <Route
          path="/dashboard/profile/orders/:id"
          element={<Order_Details />}
        />
        <Route path="/purchase/success" element={<SuccessfulPurchase />} />
        <Route path="/checkout/payment-method" element={<Checkout />} />
        <Route path="/admin" element={<Main />} />
        <Route path="/admin/product/new" element={<Main />} />
        <Route path="/admin/categories/new" element={<Main />} />
        <Route path="/admin/categories/all" element={<Main />} />
        <Route path="/admin/products/all" element={<Main />} />
        <Route path="/admin/orders/all" element={<Main />} />
        <Route path="/admin/orders/:id/update" element={<Main />} />
        <Route path="/admin/sub_category" element={<Main />} />
        <Route path="/admin/sub_categories/all" element={<Main />} />

      </Routes>

      <ToastContainer />
      {showCategories && <Sidebar />}
    </div>
  );
}

export default App;
