import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Message from "../../MessageBox/Message";
import Spinner from "../../Preloader/Spinner";
import Table from "../Table/Table";

const SubCategoryList = () => {
  const { data, loading } = useFetch("/categories/sub-categories");
  return (
    <div className="container-fluid">
      <Table>
        <div className="page-header">Sub Categories</div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sub Category</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : data?.sub_categories?.length === 0 ? (
                    <Message type="order" msg="No Sub Categories Found" />
                  ) : (
                    data?.sub_categories?.map((item) => (
                      <tr>
                        <td> {item.name}</td>
                        <td> {item.Category.name}</td>

                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-danger">Delete</button>
                            <button className="btn btn-primary">
                              <Link to="/">Edit</Link>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Table>
    </div>
  );
};

export default SubCategoryList;
