import './App.css';
import Home from './Routes/Home';
import {Routes,Route} from 'react-router-dom'
import Product_Details from './Routes/Product_Details/Product_Details';
import Shop from './Routes/Shop/Shop';
import Cart from './Routes/Cart/Cart';
import Checkout from './Routes/Checkout/Checkout';
function App() {
  return (
    <div className="App">
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:id" element={<Product_Details/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/checkout/payment-method" element={<Checkout/>} />

     </Routes>
    </div>
  );
}

export default App;
