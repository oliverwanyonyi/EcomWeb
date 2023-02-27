import { useState } from "react";
import FormsContainer from "../../Forms/FormsContainer";
import axios from "../../../axios";
import { toast } from "react-toastify";
import "./create.css";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../useFetch";
import Spinner from "../../Preloader/Spinner";
const CreateProduct = () => {
  const navigate = useNavigate();
  const { data: categories, loading: loadingCates } = useFetch("/categories");
  const [images, setImages] = useState([]);
  const [tempImg, setTempImg] = useState();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    discount: 0,
    price: 0,
    countInStock: 0,
  });
  const showWidget = () => {
    console.log("widget");
    const widget = window.cloudinary.createUploadWidget(
      {
        uploadPreset: "ecomerce_app",
        cloudName: "wanyonyi",
      },
      (error, result) => {
        console.log();
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };
  const handleRemove = (img) => {
    console.log("running", img);

    setTempImg(img.public_id);

    axios
      .delete(`/resources/images/${img.public_id}`)
      .then(() => {
        setTempImg(null);
        setImages((prev) =>
          prev.filter((item) => item.public_id !== img.public_id)
        );
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      product.name &&
      product.category &&
      product.countInStock &&
      product.description &&
      product.discount &&
      product.price &&
      images.length > 0
    ) {
      axios
        .post("/products/create", { ...product, product_images: images })
        .then((res) => {
          toast.error(`${res.data.name} created successfully`, {
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
            navigate("/admin");
          }, 3000);
        })
        .catch((error) => {
          toast.error(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
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
    } else {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <FormsContainer>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Create New Product</h3>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name for product here"
                    id="name"
                    onChange={handleChange}
                    value={product.name}
                  />
                </div>
              </div>
              <div className="col-md-6">
                {loadingCates ? (
                  <Spinner />
                ) : (
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      onChange={handleChange}
                      value={product.category}
                    >
                      <option value="">Select a Category</option>

                      {categories?.map((cate) => (
                        <option value={cate.id}>{cate.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="brand">Brand Name</label>
                  <select name="brand" id="brand">
                    <option value="nike">Nike</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="countstock">Count Instock</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="countInStock"
                    placeholder="Count In Stock"
                    id="count-in-stock"
                    onChange={handleChange}
                    value={product.countInStock}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price">Normal Price</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="price"
                    placeholder="Enter Product Price Here in Ksh"
                    id="product-price"
                    onChange={handleChange}
                    value={product.price}
                  />
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="discount">Discount</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="discount"
                    placeholder="Enter Product Price Here in Ksh"
                    id="discount-price"
                    onChange={handleChange}
                    value={product.discount}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={product.description}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <button className="btn" type="button" onClick={showWidget}>
                Upload Images For this Product
              </button>
              <div className="images-container d-flex flex-wrap">
                {images.map((img, idx) => (
                  <div className="preview-img">
                    <img src={img.url} alt="" />
                    <span
                      className="destroy-img "
                      onClick={() => handleRemove(img)}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-footer">
            {loading ? (
              <Spinner />
            ) : (
              <button className="btn" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </FormsContainer>
    </div>
  );
};

export default CreateProduct;
