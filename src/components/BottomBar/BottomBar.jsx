import { AppState } from "../../Store/store";
import {useNavigate} from 'react-router-dom'
import "./bbar.css";
const BottomBar = () => {
    const{state}   = AppState()
    const navigate = useNavigate()
  return (
    <div class="bottom-navigation mobile-visible">
      <ul class="bottom-bar-items">
        <li class="bottom-bar-item">
          <span class="bottom-item-icon fas fa-home"></span>
          <span class="bottom-item-title">Home</span>
        </li>
        <li class="bottom-bar-item">
          <span class="bottom-item-icon fas fa-th"></span>
          <span class="bottom-item-title">Categories</span>
        </li>
        <li class="bottom-bar-item has-popup"  onClick={()=>navigate('/cart')}>
          <span class="bottom-item-icon">
            <i class="fas fa-shopping-basket"></i>
            <span class="bottom-shopping-item-count">
              {state.cart.reduce((acc, item) => item.quantity + acc, 0)}
            </span>
          </span>
          <span class="bottom-item-title">Cart</span>
        </li>
        <li class="bottom-bar-item">
          <span class="bottom-item-icon">
            <i class="fas fa-heart"></i>
            <span class="bottom-shopping-item-count">0</span>
          </span>
          <span class="bottom-item-title">Wishlist</span>
        </li>

        <li class="bottom-bar-item has-popup">
          <span class="bottom-item-icon fas fa-user"></span>
          <span class="bottom-item-title">Account</span>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
