import React from "react";
import { useNavigate } from "react-router-dom";
import "./thankyou.css";
const SuccessfulPurchase = () => {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    setTimeout(() => {
      navigate(to);
    }, 500);
  };
  return (
    <div className="purchase-success">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto success-wrapper">
            <div className="bg-white">
              <h2>Thank you For Your Purchase</h2>
              <p>
                Order Placement was successful, we deliver between (3 to 5
                business days) be sure to check you email we will keep you updated for now you can track your order in the order page.
              </p>
              <div className="purchase-nav d-flex align-items-center justify-content-between">
                <button onClick={() => handleNavigate("/")} className="btn">Go Home</button>
                <button onClick={() => handleNavigate("/dashboard/orders")} className="btn btn-primary">
                  My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPurchase;
