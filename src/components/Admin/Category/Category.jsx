import axios from "../../../axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormsContainer from "../../Forms/FormsContainer";
import Spinner from "../../Preloader/Spinner";

const Category = () => {
  const [category,setCategory] = useState('')
  const [loading,setLoading] = useState(false)
  const handleSubmit = (e) =>{
    e.preventDefault()
     if(!category){
      toast.error("Please provide a category name",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
     }else{
      setLoading(true)
      axios.post('/categories/create',{category}).then(res=> toast.success(`${res.data.category} created successfully`,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })).catch(err=>{
        toast.error(err.response.data.message ? err.response.data.message:err.message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }).finally(()=>setLoading(false))
     }
  }
  return (
    <div>
      <FormsContainer>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Create New Category</h3>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  onChange={(e)=>setCategory(e.target.value)}
                  placeholder="Enter Category Name"
                  value={category}
                  id="category"
                />
              </div>
            </div>
          </div>
          <div className="form-footer">
            
              {loading?<Spinner/>: <button className="btn" disabled={loading} type="submit">Submit
              
              </button>}
          </div>
        </form>
      </FormsContainer>
    </div>
  );
};

export default Category;
