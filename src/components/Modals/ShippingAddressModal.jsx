import axios from "../../axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import Spinner from "../Preloader/Spinner";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ShippingAddressModal = ({
  showModal,
  setShowModal,
  editing,
  setEditing,
  selectedAddress,
  setAddresses,
}) => {
  console.log(editing);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    secondPhone: "",
    deliveryAddress: "",
    region: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const submit = async (e) => {
    e.preventDefault();
    if (
      !shippingData.firstName ||
      !shippingData.lastName ||
      !shippingData.phone ||
      !shippingData.secondPhone ||
      !shippingData.deliveryAddress ||
      !shippingData.region ||
      !shippingData.city
    ) {
      return toast.error("Please fill in all the fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      setLoading(true);
      const { data } = await axiosPrivate.post(
        "/orders/shipping-address",
        {
          ...shippingData,
        },
        { withCredentials: true }
      );
      setAddresses((prev) => [...prev, data]);
      setLoading(false);
      hideModal();
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
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };
  const hideModal = () => {
    setShowModal(false);
    if (editing) {
      setEditing(false);
    }
  };
  useEffect(() => {
    if (editing) {
      setShippingData({
        firstName: selectedAddress.FirstName,
        lastName: selectedAddress.LastName,
        phone: selectedAddress.Phone,
        secondPhone: selectedAddress.SecondPhone,
        deliveryAddress: selectedAddress.DeliveryAddress,
        region: selectedAddress.Region,
        city: selectedAddress.City,
      });
    } else {
      setShippingData({
        firstName: "",
        lastName: "",
        phone: "",
        secondPhone: "",
        deliveryAddress: "",
        region: "",
        city: "",
      });
    }
  }, [selectedAddress, editing]);
  return (
    <div className={showModal ? "modal modal-open" : "modal"}>
      <div className="modal-overlay" onClick={hideModal}></div>
      <div className="modal-form">
        <div className="container">
          <div className="modal-header">
            <h3>{editing ? "Edit Your Address" : "Add New Address"}</h3>
            <span
              className="fas fa-times"
              onClick={() => setShowModal(false)}
            ></span>
          </div>
          <form onSubmit={submit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => changeHandler(e)}
                    id="firstName"
                    value={shippingData.firstName}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={(e) => changeHandler(e)}
                    value={shippingData.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={(e) => changeHandler(e)}
                    value={shippingData.phone}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="secondPhone">Second Phone Number</label>
                  <input
                    type="tel"
                    name="secondPhone"
                    id="secondPhone"
                    value={shippingData.secondPhone}
                    onChange={(e) => changeHandler(e)}
                  />
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
                    onChange={(e) => changeHandler(e)}
                    id="deliveryAddress"
                    value={shippingData.deliveryAddress}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="region">Region </label>
                  <select
                    name="region"
                    id="region"
                    onChange={(e) => changeHandler(e)}
                  >
                    <option value="">Select Region</option>
                    <option value="nyanza">Nyanza</option>
                    <option value="western">Western</option>
                    <option value="central">Central</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="city">City/Town </label>
                  <select
                    name="city"
                    id="city"
                    onChange={(e) => changeHandler(e)}
                  >
                    <option value="">Select City</option>

                    <option value="Nyanza Town">Machakos Town</option>
                    <option value="Nairobi Town">Nairobi Town</option>
                    <option value="Kisumu Town">Kisumu Town</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" loading={loading}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressModal;
