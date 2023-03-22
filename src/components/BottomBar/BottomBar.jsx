import { AppState } from "../../Store/store";
import {useNavigate} from 'react-router-dom'
import "./bbar.css";
const BottomBar = () => {
    const{state,setShowCategories}   = AppState()
    const navigate = useNavigate()
  return (
    <div className="bottom-navigation mobile-visible">
      <ul className="bottom-bar-items">
        <li className="bottom-bar-item">
          <span className="bottom-item-icon fas fa-home"></span>
          <span className="bottom-item-title">Home</span>
        </li>
        <li className="bottom-bar-item" onClick={()=>setShowCategories(prev=>!prev)}>
          <span className="bottom-item-icon fas fa-th"></span>
          <span className="bottom-item-title">Categories</span>
        </li>
        <li className="bottom-bar-item has-popup"  onClick={()=>navigate('/cart')}>
          <span className="bottom-item-icon">
            <i className="fas fa-shopping-basket"></i>
            <span className="bottom-shopping-item-count">
              {state.cart.reduce((acc, item) => item.quantity + acc, 0)}
            </span>
          </span>
          <span className="bottom-item-title">Cart</span>
        </li>
        <li className="bottom-bar-item">
          <span className="bottom-item-icon">
            <i className="fas fa-heart"></i>
            <span className="bottom-shopping-item-count">0</span>
          </span>
          <span className="bottom-item-title">Wishlist</span>
        </li>

        <li className="bottom-bar-item has-popup" onClick={()=>navigate("/dashboard/profile")}>
          <span className="bottom-item-icon fas fa-user"></span>
          <span className="bottom-item-title">Account</span>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
