import React from "react";
import './product.css'
import {Link,useNavigate} from 'react-router-dom'
import Rating from "../Rating/Rating";
import { addToCart } from "../../Routes/Product_Details/utils/addToCart";
import { AppState } from "../../Store/store";

const Product = ({product:item}) => {
  const {state,dispatch} = AppState()
  const navigate = useNavigate()
  const handleClick = () =>{
    console.log(item,state);
    addToCart(item,state,dispatch)
    navigate('/cart')
  }
  return (
    <div>
      <div className="product-card product">
        <div className="product-image">
          <div className="wish-btn">
            <span className="btn-title">add to wishlist</span>
            <i className="fas fa-heart"></i>
          </div>

          <Link to={"/products/" + item.id}>
            <img src={item.image} loading="lazy" />
          </Link>
          <button className="btn cart-btn" onClick={handleClick}>
            <span className="btn-icon fas fa-shopping-basket"></span>
            Add to cart
          </button>
        </div>
        <div className="product-body">
          <Link to={"/products/" + item.id}>
            <h2 className="product-title">{item.title}</h2>
          </Link>
          <div className="product-price">
            <p className="rg-p">Ksh {(item.price*126).toFixed(2)}</p>

            <p className="ds-p">Ksh {(item.price*126 - 200).toFixed(2) }</p>
          </div>
          <div className="review">
            <Rating rating={item.rating.rate}/>
            <p className="review-title">({item.rating.count}) reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
