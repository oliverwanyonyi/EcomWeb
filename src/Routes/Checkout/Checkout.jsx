import { useState } from "react";
import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { AppState } from "../../Store/store";
import "./checkout.css";
const Checkout = () => {
  const { state } = AppState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const search = new URLSearchParams(useLocation().search);
  const currpath = useResolvedPath().pathname;
  const [paymentMethod, setPaymentMethod] = useState();

  return (
    <main className="checkout">
      <nav className="checkout-nav">
        <div className="container">
          <h3 className="nav-header">Checkout</h3>
        </div>
      </nav>
      <div className="container py-3">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <div className="bg-white px-2 py-3">
              {currpath === "/checkout/payment-method" ? (
                <div className="col-item payment-methods">
                  <h3 className="header">Payment Method</h3>
                  <div className="row align-items-center g-2 g-md-0">
                    {/* <div className="col-12">
                   
                   <input type="radio" name="paypal" id="paypal" 
                    checked={paymentMethod ==="paypal"}
                    value="paypal"
                    onChange={(e)=>setPaymentMethod(e.target.value)}/>
                   <label htmlFor="paypal">Paypal</label>
                 </div> */}
                    <div className="col-12">
                      <input
                        type="radio"
                        name="mpesa"
                        id="mpesa"
                        checked={paymentMethod === "mpesa"}
                        value="mpesa"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="mpesa">Mpesa</label>
                    </div>
                    <div className="col-12">
                      <input
                        type="radio"
                        name="cashOnDelivery"
                        id="cashOnDelivery"
                        checked={paymentMethod === "cashOnDelivery"}
                        value="cashOnDelivery"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-item">
                  <h3 className="header">Shipping Address</h3>
                  <div className="row align-items-center g-2 g-md-0">
                    <div className="col-md-6">
                      <div className="shipping-address-item row align-items-center selected">
                        <div className="col-10">
                          <h3 className="s-location">
                            Somewhere, In the World
                          </h3>
                          <p className="s-contact">+000000000000</p>
                        </div>
                        <div className="col-2">
                          <button
                            className="edit-address-btn"
                            onClick={() => setShowModal(!showModal)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="shipping-address-item add">
                        <div className="col d-flex align-items-center">
                          <button
                            className="add-address-btn"
                            onClick={() => setShowModal(!showModal)}
                          >
                            Add Shipping Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white px-2 py-3">
              <h2 className="header">Your order Items</h2>
              <div className="order-items-container">
                {state.cart.map((item, idx) => (
                  <div className="row" key={idx}>
                    <div className="col-3">
                      <div className="item-thumb">
                        <img src={item.thumb} alt={item.name} />
                      </div>
                    </div>
                    <div className="col-9">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-price">
                        Ksh {(item.price * 123).toFixed(2)}
                      </p>
                      <p className="item-quantity"> ({item.quantity})</p>
                    </div>
                  </div>
                ))}
              </div>
              {currpath === "/checkout/payment-method" ? (
                <button
                  className="pm-btn"
                  title="proceed to payment method selection"
                  onClick={() => navigate("/checkout/payment-method")}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="pm-btn"
                  title="proceed to payment method selection"
                  onClick={() => navigate("/checkout/payment-method")}
                >
                  Payment Method
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={showModal ? "modal modal-open" : "modal"}>
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="modal-form">
          <div className="container">
            <div className="modal-header">
              <h3>Add New Address</h3>
              <span
                className="fas fa-times"
                onClick={() => setShowModal(false)}
              ></span>
            </div>
            <form>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" name="phone" id="phone" />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="secondPhone">Second Phone Number</label>
                    <input type="tel" name="secondPhone" id="secondPhone" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label htmlFor="deliveryAddress">Delivery Address </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      id="deliveryAddress"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label htmlFor="region">Region </label>
                    <select name="region" id="region">
                      <option value="nyanza">Nyanza</option>
                      <option value="nyanza">Western</option>
                      <option value="nyanza">Central</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label htmlFor="region">City/Town </label>
                    <select name="region" id="region">
                      <option value="nyanza">Machakos Town</option>
                      <option value="nyanza">Nairobi Town</option>
                      <option value="nyanza">Kisumu Town</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="button">Save</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
