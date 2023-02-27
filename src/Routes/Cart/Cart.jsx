
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import './cart.css'
import QuantityInput from '../../components/Quantity'
import {Link} from 'react-router-dom'
import { AppState } from "../../Store/store";
import Message from "../../components/MessageBox/Message";
import Navbar from "../../components/Navbar/Navbar";
const Cart = () => {
  const {state,dispatch} = AppState()

  
  return (
    <main className="cart">
      <Navbar/>
      <BreadCrump hierachies={[
    {
      name:"Home",
      path:'/'
    },{
      name:"Cart",
      path:'/cart'
    }
  ]} />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="bg-white px-2 py-3">
              {state.cart.length === 0?<Message  type="cart"/>:
              <table>
                <thead className="cart-header">
                  <tr>
                    <th colSpan={2}> My Items</th>
                    <th className="cart-desktop-visible"> Price</th>
                    <th> Quantity</th>
                    <th className="cart-desktop-visible"> Total</th>
                  </tr>
                </thead>
                <tbody>
                  {state.cart.map((item,idx)=>(
 <tr key={idx}>
 <td>
   <div className="product-thumb">
     <Link to={"/products/" + item.id}><img src={item.thumb} alt="" /></Link>
   </div>
 </td>
 <td >
<div className="product-details">
<h3 className="product-title"><Link to={'/products/'+item.id}>{item.title}</Link></h3>
<div className="cart-actions">

<button className="destroy-pdct-btn" onClick={()=>{
  dispatch({type:"REMOVE_FROM_CART",payload:item.id})
}}>remove from cart</button>

<button><Link className="fav-btn" to="">Add to favorite</Link></button>
</div>
<div className="mobile-visible">
<span className="price-qty">{item.quantity} X</span>
<span className="price-amount">{item.price}</span>
</div>
</div>
 </td>
 <td className="cart-desktop-visible">  <span className="price-qty">{item.price} </span></td>
 <td>
   <QuantityInput qty={item.quantity} item={item}/>
 </td>
 <td className="cart-desktop-visible"> <span className="price-amount">{(item.quantity * item.price).toFixed(2)}</span></td>
 </tr>

                  ))}
                 
                </tbody>
              </table>
}
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white px-2 py-2">
              <h1 className="cart-totals">Order Summary</h1>
              <ul className="cart-summary d-flex flex-column">
              <li className="cart-summary-item d-flex justify-content-between align-items-center">
                  <h3>Sub Total</h3>
                  <p>{state.cart.reduce((acc,item)=>(item.price * item.quantity)+acc,0 ).toFixed(2)}</p>
                </li>
                <li className="cart-summary-item d-flex justify-content-between align-items-center">
                  <h3>Shipping Fee</h3>
                  <p>Calculating at checkout</p>
                </li>
                <li className="cart-summary-item">
                    <Link className="btn continue-shopping-btn" to="/">Contine Shopping</Link>
                </li>
                <li className="cart-summary-item">
                    <Link className="btn checkout-btn" to="/checkout">Proceed to checkout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Cart;
