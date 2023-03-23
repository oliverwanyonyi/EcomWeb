import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import FormsContainer from "../Forms/FormsContainer";
import { getErrorMessage } from "../../utils/getErrorMessage";
import "./modal.css";
const RatingModal = ({ showModal, setShowModal,id }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment,setComment] = useState('')
  const [loading,setLoading] = useState(false)
  const axiosPrivate = useAxiosPrivate();
  const handleClick =async ()=>{
    
   setShowModal(true)
setLoading(true)
   try {
      const response = await axiosPrivate .post(`/products/${id}/rate`,{
        rate:rating,comment
      })
      if(response.status === 201){
        toast.success("You have successfully reviewed this product")
      }
      setComment('')
      setRating('')
      setLoading(false)
      setTimeout(()=>{
        hideModal()
      },2000)
   } catch (error) {
      toast.error(getErrorMessage(error),{
        autoClose:3000
      })
      setLoading(false)
   }
  }
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div
      className={
        showModal ? "modal modal-open rating-modal" : "modal rating-modal"
      }
    >
      <div className="modal-overlay" onClick={hideModal}></div>
      <div className="col-md-6 mx-auto rating-wrapper">
        <div className="bg-white">
          <FormsContainer>
            <div className="modal-header">
              <h3>Rate this product 1/5</h3>
              <span className="fas fa-times" onClick={hideModal}></span>
            </div>
            <div className="form-group">
              <div className="rating-component">
                {[...Array(5)].map((star, idx) => {
                  idx += 1;
                  return (
                    <span
                      className={
                        idx <= (rating || hover) ? "star on" : "star off"
                      }
                      onClick={() => setRating(idx)}
                      style={{ fontSize: "30px" }}
                      onMouseEnter={() => setHover(idx)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="comment">Leave a comment</label>
              <textarea
                name="comment"
                placeholder="Write your comment here please"
                onChange={(e)=>setComment(e.target.value)}
                id="comment"
              ></textarea>
            </div>
            <div className="form-footer">
              <button type="button" disabled={loading} className="btn btn-primary" onClick={handleClick}>Leave a review</button>
            </div>
          </FormsContainer>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
