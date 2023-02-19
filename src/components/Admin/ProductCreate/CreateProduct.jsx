import React from "react";
import FormsContainer from "../../Forms/FormsContainer";

const CreateProduct = () => {
  return (
    <div>
      <FormsContainer>
        <form>
          <div className="form-header">
            <h3>Create New Product</h3>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="product-name">Name</label>
                  <input
                    type="text"
                    name="product_name"
                    placeholder="Enter name for product here"
                    id="product-name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category">Category</label>

                  <select name="category" id="category">
                    <option value="electronics">Electronics</option>
                    <option value="Clothings for men">Clothings for men</option>
                    <option value="Clothings for women">
                      Accessories for women
                    </option>
                    <option value="Accessories for men">
                      Accessories for women
                    </option>
                    <option value="Accessories for women">
                      Accessories for women
                    </option>
                  </select>
                </div>
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
                  <label htmlFor="count-in-stock">Count Instock</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="count_in_stock"
                    placeholder="Count In Stock"
                    id="count-in-stock"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="product-price">Normal Price</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="product_price"
                    placeholder="Enter Product Price Here in Ksh"
                    id="product-price"
                  />
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="discount-price">Discount Price</label>
                  <input
                    type="number"
                    min={0}
                    steps="2"
                    name="discount_price"
                    placeholder="Enter Product Price Here in Ksh"
                    id="discount-price"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <button className="btn">Submit</button>
          </div>
        </form>
      </FormsContainer>
    </div>
  );
};

export default CreateProduct;
