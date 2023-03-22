import axios from "../../../axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormsContainer from "../../Forms/FormsContainer";
import Spinner from "../../Preloader/Spinner";
import Button from "../../Button/Button";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrder = () => {
  const [orderInfo, setOrderInfo] = useState({
    paymentStatus: 0,
    status: "placed",
  });
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderInfo.paymentStatus || !orderInfo.status) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setLoading(true);

      axiosPrivate
        .post(`/orders/${id}/update`, orderInfo)
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Order Updated Successfully`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/admin/orders/all");
            }, 3000);
          }
        })
        .catch((err) => {
          toast.error(
            err.response.data.message ? err.response.data.message : err.message,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        })
        .finally(() => setLoading(false));
    }
  };
  const changeHandler = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <FormsContainer>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Updating Order #{id}</h3>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="category">Payment Status</label>
                <select
                  name="paymentStatus"
                  id="paymentStatus"
                  onChange={(e) => changeHandler(e)}
                >
                  <option value="">Update payment status</option>
                  <option value="1">Paid</option>
                  <option value="0">Not paid</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Order Status</label>

                <select
                  name="status"
                  id="status"
                  onChange={(e) => changeHandler(e)}
                >
                  <option value="">Update Order Status</option>
                  <option value="delivered">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="ready for pickup">Ready For Pickup</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <Button className="btn" type="submit" loading={loading}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </form>
      </FormsContainer>
    </div>
  );
};

export default UpdateOrder;
