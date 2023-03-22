import axios from "../../../axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormsContainer from "../../Forms/FormsContainer";
import Spinner from "../../Preloader/Spinner";
import Button from "../../Button/Button";
import { useFetch } from "../../../hooks/useFetch";

const SubCategory = () => {
  const [category, setCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: categories, loading: loadingCates } = useFetch("/categories");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !sub_category) {
      toast.error("All Fields are required", {
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

      axios
        .post("/categories/sub_category/create", { category, sub_category })
        .then((res) =>
          toast.success(`${res.data.sub_category} created successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        )
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
  return (
    <div>
      <FormsContainer>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Create New Sub Category</h3>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="category">
                  Select a Category that this subcategory{" "}
                </label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a Category </option>

                  {categories?.map((cate) => (
                    <option value={cate.id}>{cate.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sub_category">Sub Category</label>
                <input
                  type="text"
                  name="sub_category"
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Enter Sub Category Name"
                  value={sub_category}
                  id="sub_category"
                />
              </div>
            </div>
          </div>
          <div className="form-footer">
            <Button className="btn" type="submit" loading={loading}>
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </FormsContainer>
    </div>
  );
};

export default SubCategory;
