import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BottomBar from "../../components/BottomBar/BottomBar";
import Button from "../../components/Button/Button";
import RatingModal from "../../components/Modals/RatingModal";
import Navbar from "../../components/Navbar/Navbar";
import Preloader from "../../components/Preloader/Preloader";
import { useFetch } from "../../hooks/useFetch";
import "./order_details.css";

const Order_Details = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/orders/" + id);
  const [showModal,setShowModal] = useState(false);
  const [itemId,setItemId] = useState();
  const handleClick = (id)=>{
   setShowModal(true);
    setItemId(id)
  }
  return (
    <div>
      <Navbar />
      <div className="container order-main">
        <div className="bg-white mx-auto col-md-9">
          <h2 className="order-title">Order History</h2>
          <div className="order-list-container">
            <div className="order-list-item header-list">
              <div className="row justify-content-between">
                <div className="order-info">
                  <div className="order-id">#{id}</div>
                  <div className={"order-status "+data?.order.status}>
                    {data?.order.delivered
                      ?"Delivered on "+ data?.order.deliveredAt
                      : data?.order.status}
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <Preloader />
            ) : (
              data?.order?.orderItems.map((item) => (
                <div className="order-list-item" key={item.id}>
                  <div className="row align-items-center">
                    <div className="col-4 col-lg-3">
                      <div className="order-item-img">
                        <img src={item.product_display} alt={item.title} />
                      </div>
                    </div>
                    <div className="col-8 col-lg-9">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <h3 className="item-title">{item.title}</h3>
                        </div>
                        <div>
                          <h3 className="price">Ksh {item.price}</h3>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="item-qty">
                          <span>Qty :</span>
                          {item.quantity}
                        </div>
                        <div>
                          <button className="btn review-btn" disabled={!item.delivered} title={item.delivered?"You can now review this product":"You will be able to review this product once its delivered"} type="buton" onClick={()=>handleClick(item.id)}>
                            Leave Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
       <RatingModal showModal={showModal} setShowModal={setShowModal} id={itemId}/>
      <BottomBar />
    </div>
  );
};

export default Order_Details;
