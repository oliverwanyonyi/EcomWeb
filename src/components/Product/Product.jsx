import React from "react";
import './product.css'
import {Link,useNavigate} from 'react-router-dom'
import Rating from "../Rating/Rating";
import { addToCart } from "../../utils/addToCart";
import { AppState } from "../../Store/store";
import Button from "../Button/Button";
import { toast } from "react-toastify";

const Product = ({product:item}) => {
  const {state,dispatch} = AppState()
  const navigate = useNavigate()
  const handleAddToCart = () =>{
   
    addToCart({...item,price:(((100 - item.discount)/100)*item.price).toFixed(0)},state,dispatch)
     toast.success(`${item.name} Added to your cart`,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     })
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
            <img src={item?.Product_Images[0].url} loading="lazy" />
          </Link>
          <Button background="btn cart-btn" type="button" handleAddToCart={handleAddToCart}>
            <span className="btn-icon fas fa-shopping-basket"></span>
            Add to cart
          </Button>
        </div>
        <div className="product-body">
          <Link to={"/products/" + item.id}>
            <h2 className="product-title">{item.name}</h2>
          </Link>
          <div className="product-price">
            

            {item.discount > 0 ?
          <>
          <p className="rg-p">Ksh {(item.price.toFixed(0))}</p>
          <p className="ds-p">Ksh { (((100 - item.discount)/100)*(item.price)).toFixed(0)}</p>
          </>
            :<p className="ds-p">Ksh {item.price.toFixed(0) }</p>}
          </div>
          <div className="review">
            <Rating rating={item?.rating?.rate}/>
            <p className="review-title">({item?.rating?.count}) reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
