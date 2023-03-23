import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Message from "../MessageBox/Message";
import Preloader from "../Preloader/Preloader";
import "./user_orders.css";

const UserOrders = () => {
  const { data, loading, error } = useFetch("/orders/user/all");
  return (
    <div className="orders-main">
      <div className="bg-white ">
        <div className="orders-container">
          <div className="order-title">Your Orders</div>
          {loading ? (
            <Preloader />
          ) : data?.orders?.length === 0 ? (
            <Message type="order" msg="You have no order history" />
          ) : (
            data?.orders?.map((order, idx) => (
              <div className="row align-items-center order-list" key={idx}>
                <div className="col-md-4 col-lg-3">
                  <div className="order-img-container">
                    <img
                      src={order?.orderItems[0]?.product_display}
                      alt={order.orderItems[0]?.title}
                    />
                  </div>
                </div>
                <div className="col-md-8 col-lg-9 d-md-flex justify-content-md-between">
                  <div className="item-details">
                    <h2 className="item-name">{order.orderItems[0]?.title}</h2>
                    <p className="order-number">
                      {" "}
                      <span>Order</span> : #{order.id}
                    </p>
                    <div className={"order-status "+order.status}>
                      {order.delivered
                        ? "Delivered on " + order.deliveredAt
                        : order.status}
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/profile/orders/${order.id}`}
                    className="btn btn-primary align-self-start"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
