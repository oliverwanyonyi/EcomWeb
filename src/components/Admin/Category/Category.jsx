import React from "react";
import FormsContainer from "../../Forms/FormsContainer";

const Category = () => {
  return (
    <div>
      <FormsContainer>
        <form>
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
                  placeholder="Enter Category Name"
                  id="category"
                />
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

export default Category;
