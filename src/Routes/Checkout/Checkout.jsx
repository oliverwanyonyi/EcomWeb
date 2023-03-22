import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { toast } from "react-toastify";
import ShippingAddressModal from "../../components/Modals/ShippingAddressModal";
import { AppState } from "../../Store/store";
import { getErrorMessage } from "../../utils/getErrorMessage";
import "./checkout.css";
import Spinner from "../../components/Preloader/Spinner";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Checkout = () => {
  const { state, dispatch } = AppState();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const currpath = useResolvedPath().pathname;
  const [paymentMethod, setPaymentMethod] = useState();
  const [loadAddress, setLoadAddress] = useState(false);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const next = useLocation().pathname;

  const handleSelect = (selected) => {
    setSelectedAddress(selected);
  };
  const handleEdit = (address) => {
    setEditing(true);
    setShowModal(!showModal);
  };

  const placeOrder = async () => {
    try {
      setPlaceOrderLoading(true);
      let data, status;
      if (paymentMethod === "Cash On Delivery") {
        const res = await axiosPrivate.post("/orders/place", {
          orderItems: state.cart.map((item) => item),
          paymentMethod,
          orderTotal: state.cart
            .reduce((acc, item) => item.price * item.quantity + acc, 0)
            .toFixed(0),
          shippingAddress: selectedAddress.id,
        });
        status = res.status;
        data = res.data;
      }
      if (status === 201) {
        console.log(data.status);
        setPlaceOrderLoading(false);
        dispatch({ type: "CLEAR_CART" });
        setTimeout(() => {
          navigate("/purchase/success");
        }, 2000);
        toast.success("Order Was Placed Successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPlaceOrderLoading(false);
    }
  };

  const getShippingAddress = async () => {
    setLoadAddress(true);

    try {
      const { data } = await axiosPrivate.get("/orders/shipping-address/all");
      setAddresses(data.shippingAddresses);
      setSelectedAddress(data.shippingAddresses[0]);
      setLoadAddress(false);
    } catch (error) {
      toast.error(getErrorMessage(error), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setLoadAddress(false);
    }
  };

  useEffect(() => {
    getShippingAddress();
  }, []);

  useEffect(() => {
    if (state.cart.length === 0) {
      navigate("/");
    }
    if (!JSON.parse(localStorage.getItem("auth"))?.access_token) {
      navigate('/login?next='+next);
    }
  }, []);

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
                        checked={paymentMethod === "Mpesa"}
                        value="Mpesa"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="mpesa">Mpesa</label>
                    </div>
                    <div className="col-12">
                      <input
                        type="radio"
                        name="cashOnDelivery"
                        id="cashOnDelivery"
                        checked={paymentMethod === "Cash On Delivery"}
                        value="Cash On Delivery"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-item">
                  <h3 className="header">
                    Select or add new Shipping Address{" "}
                  </h3>
                  <div
                    className={
                      loadAddress
                        ? "d-flex align-items-center justify-content-center"
                        : "row align-items-center g-2"
                    }
                  >
                    {loadAddress ? (
                      <Spinner />
                    ) : (
                      <>
                        {addresses?.map((address, idx) => (
                          <div className="col-md-6" key={idx}>
                            <div
                              className={
                                address?.id === selectedAddress?.id
                                  ? "shipping-address-item row  align-items-center selected"
                                  : "shipping-address-item row  align-items-center"
                              }
                              onClick={() => handleSelect(address)}
                            >
                              <div className="col-10">
                                <h3 className="s-location">
                                  {address.DeliveryAddress}
                                </h3>
                                <p className="s-contact">{address.Phone}</p>
                              </div>
                              <div className="col-2">
                                <button
                                  className="edit-address-btn"
                                  onClick={() => handleEdit(address)}
                                >
                                  More
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

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
                      </>
                    )}
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
                      <p className="item-price">Ksh {item.price}</p>
                      <p className="item-quantity"> ({item.quantity})</p>
                    </div>
                  </div>
                ))}
              </div>
              {currpath === "/checkout/payment-method" ? (
                <button
                  className="pm-btn place-order-btn"
                  type="button"
                  title="Place your order"
                  onClick={placeOrder}
                  disabled={
                    !selectedAddress?.id || placeOrderLoading || !paymentMethod
                  }
                >
                  {placeOrderLoading ? (
                    <>
                      <Spinner /> Placing Order ...
                    </>
                  ) : (
                    " Complete Purchase"
                  )}
                </button>
              ) : (
                <button
                  className="pm-btn"
                  title="proceed to payment method selection"
                  onClick={() => navigate("/checkout/payment-method")}
                >
                  Proceed to Payment Method Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ShippingAddressModal
        showModal={showModal}
        editing={editing}
        setEditing={setEditing}
        selectedAddress={selectedAddress}
        setShowModal={setShowModal}
        setAddresses={setAddresses}
      />
    </main>
  );
};

export default Checkout;
