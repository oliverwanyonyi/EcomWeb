import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import p3 from "../../assets/p4.jpg";
import BreadCrump from "../../components/BreadCrump";
import Navbar from "../../components/Navbar/Navbar";
import Preloader from "../../components/Preloader/Preloader";
import ProductGallery from "../../components/ProductGallery";
import { AppState } from "../../Store/store";
import "./product_details.css";
import { addToCart } from "./utils/addToCart";
const Product_Details = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = AppState();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  console.log(id);
  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products/" + id
      );
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleClick = () => {
    addToCart(product, state, dispatch);
    navigate("/cart");
  };
  // const addToCart = () => {

  //   let cartItem = {
  //     title: product.title,
  //     thumb: product.image,
  //     id: product.id,
  //     price: product.price,
  //   };
  //   const itemExists = state.cart.find((item) => item.id === product.id);

  //   if (itemExists) {
  //     console.log(itemExists.quantity);
  //     cartItem = { ...itemExists, quantity: itemExists.quantity + 1 };
  //   } else {
  //     cartItem = { ...cartItem, quantity: 1 };
  //   }

  //   dispatch({ type: "ADD_TO_CART", payload: { item: cartItem } });
  // };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="main">
      <Navbar />
      <BreadCrump />
      <div className="product-container">
        <div className="container">
          <div className="bg-white py-3 px-2">
            {loading ? (
              <Preloader />
            ) : (
              <div className="row g-3">
                <div className="col-md-6">
                  <ProductGallery image={product?.image} />
                </div>
                <div className="col-md-6">
                  <div className="col_product-details">
                    <h2 className="product-title">{product?.title}</h2>
                    <div className="review">
                      <div className="stars-container">
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                      </div>
                      <p className="review-title">(10) reviews</p>
                    </div>
                    <div className="product-price">
                      <p className="rg-p">
                        Ksh {(product?.price * 126).toFixed(2)}
                      </p>

                      <p className="ds-p">
                        Ksh {(product?.price * 126 - 200).toFixed(2)}
                      </p>
                    </div>

                    <div className="product-attributes">
                      {/* <div className="product-attribute">
                        <div className="attribute-title">Qty</div>
                        <div className="divider">:</div>
                        <QuantityInput qty={qty} setQty={setQty} />
                        <span className="text-danger stock-status">
                          Out of stock
                        </span>
                      </div> */}

                      <div className="actions-container">
                        <button className="btn rd-c-sm" onClick={handleClick}>
                          <span className="btn-icon fas fa-shopping-basket"></span>
                          <span className="btn-title">Add to cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="reviews-section">
        <div className="container">
          <div className="bg-white py-lg rd-c-sm">
            {loading ? (
              <Preloader />
            ) : (
              <div className="product-footer">
                <div className="product-footer-header">
                  <div className="footer-tab tab-active" data-tab="description">
                    <h2 className="tab-title">Description</h2>
                  </div>
                  <div className="footer-tab" data-tab="reviews">
                    <h2 className="tab-title">Reviews</h2>
                  </div>
                </div>
                <div className="footer-body">
                  <div
                    className="tab-content tab-active"
                    data-tab="description"
                  >
                    <p className="product-desc">{product?.description}</p>
                  </div>
                  <div
                    className="tab-content reviews-container"
                    data-tab="reviews"
                  >
                    <div className="reviews-header">
                      <h2 className="title">Reviews (2)</h2>
                    </div>
                    <div className="reviews-body">
                      <div className="product-review">
                        <div className="review-l">
                          <h2 className="review-user-name">Oliver Wanyonyi</h2>
                          <p className="review-time-stamp">4 days ago</p>
                          <div className="stars-container">
                            <span className="fas fa-star"></span>
                            <span className="fas fa-star"></span>
                            <span className="fas fa-star"></span>
                            <span className="fas fa-star"></span>
                            <span className="fas fa-star"></span>
                          </div>
                        </div>
                        <div className="review-r">
                          <div className="comment">
                            Great shoes nice quality
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="related-section">
        <div className="container">
          <div className="bg-white py-3 rd-c-sm px-2">
            <div className="products-section-header">
              <h2 className="title">Related products</h2>
            </div>
            <div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              {/* <Product /> */}
            </div>
            <div className="show__more-section">
              <button className="btn show-more-btn">Show More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Details;
