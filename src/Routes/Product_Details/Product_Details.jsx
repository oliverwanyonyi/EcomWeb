import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Navbar from "../../components/Navbar/Navbar";
import Preloader from "../../components/Preloader/Preloader";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import { AppState } from "../../Store/store";
import { useFetch } from "../../hooks/useFetch";
import "./product_details.css";
import { addToCart } from "../../utils/addToCart";
import Spinner from "../../components/Preloader/Spinner";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import { useRef } from "react";
import Rating from "../../components/Rating/Rating";
import Message from "../../components/MessageBox/Message";
import { useEffect } from "react";
import { getErrorMessage } from "../../utils/getErrorMessage";
const Product_Details = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("description");
  const tabRef = useRef();
  const { state, dispatch } = AppState();
  const { id } = useParams();
  const { data, loading, error } = useFetch("/products/" + id);

  const handleAddToCart = () => {
    let item = {
      ...data.product,
      price: (
        ((100 - data.product.discount) / 100) *
        data?.product.price
      ).toFixed(0),
    };

    addToCart(item, state, dispatch);
    toast.success(`${data.product.title} Added to your cart`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
useEffect(()=>{
  if(error){
    toast.error(getErrorMessage(error))
  }
},[])
  return (
    <div className="main">
      <Navbar />
      {loading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <BreadCrump hierachies={data?.hierachies} />
      )}
      <div className="product-container">
        <div className="container">
          <div className="bg-white py-3 px-2">
            {loading ? (
              <Preloader />
            ) : (
              <div className="row g-3">
                <div className="col-md-6">
                  <ProductGallery images={data?.product.Product_Images} />
                </div>
                <div className="col-md-6">
                  <div className="col_product-details">
                    <h2 className="product-title">{data?.product?.title}</h2>
                    <div className="review">
                      <Rating rating={data?.product.averageRating} />

                      <p className="review-title">
                        ({data?.product.reviewsCount}) reviews
                      </p>
                    </div>
                    <div className="product-price">
                      {data?.product?.discount > 0 ? (
                        <>
                          <p className="rg-p">
                            Ksh {data?.product?.price.toFixed(0)}
                          </p>
                          <p className="ds-p">
                            Ksh{" "}
                            {(
                              ((100 - data?.product?.discount) / 100) *
                              data?.product?.price
                            ).toFixed(0)}
                          </p>
                        </>
                      ) : (
                        <p className="ds-p">
                          Ksh {data?.product?.price?.toFixed(0)}
                        </p>
                      )}
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
                        <Button
                          background="btn rd-c-sm"
                          handleAddToCart={handleAddToCart}
                        >
                          <span className="btn-icon fas fa-shopping-basket"></span>
                          <span className="btn-title">Add to cart</span>
                        </Button>
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
                <div className="product-footer-header" ref={tabRef}>
                  <div
                    className={
                      tab === "description"
                        ? "footer-tab tab-active"
                        : "footer-tab"
                    }
                    data-tab="description"
                    onClick={() => setTab("description")}
                  >
                    <h2 className="tab-title">Description</h2>
                  </div>
                  <div
                    className={
                      tab === "reviews" ? "footer-tab tab-active" : "footer-tab"
                    }
                    data-tab="reviews"
                    onClick={() => setTab("reviews")}
                  >
                    <h2 className="tab-title">Reviews</h2>
                  </div>
                </div>
                <div className="footer-body">
                  <div
                    className={
                      tab === "description"
                        ? "tab-content  tab-active"
                        : "tab-content"
                    }
                    data-tab="description"
                  >
                    <p className="product-desc">{data?.product?.description}</p>
                  </div>

                  <div
                    className={
                      tab === "reviews"
                        ? "tab-content reviews-container tab-active"
                        : "tab-content reviews-container"
                    }
                    data-tab="reviews"
                  >
                    <div className="reviews-header">
                      <h2 className="title">
                        Reviews ({data?.product?.Reviews.length})
                      </h2>
                    </div>
                    <div className="reviews-body">
                      {data?.product?.Reviews.length === 0 ? (
                        <Message msg="This product has not been reviewed yet" />
                      ) : (
                        data?.product?.Reviews.map((review, idx) => (
                          <div className="product-review" key={idx}>
                            <div className="review-l">
                              <h2 className="review-user-name">
                              Anonymous
                              </h2>
                              <p className="review-time-stamp">
                                {review?.createdAt}
                              </p>
                              <Rating rating={review.rate} />
                            </div>
                            <div className="review-r">
                              <div className="comment">{review?.comment}</div>
                            </div>
                          </div>
                        ))
                      )}
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
