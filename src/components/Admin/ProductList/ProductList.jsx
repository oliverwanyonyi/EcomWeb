import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Message from "../../MessageBox/Message";
import Spinner from "../../Preloader/Spinner";
import Table from "../Table/Table";

const ProductList = () => {
  const { data, loading } = useFetch("/products");
  return (
    <div className="container-fluid">
      <Table>
        <div className="page-header">Products</div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Display</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>

                    <th>Description</th>
                    <th>Instock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : data.length === 0 ? (
                    <Message type="order" msg="No products Found" />
                  ) : (
                    data?.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <img src={item.Product_Images[0].url} alt="" />
                        </td>
                        <td> {item.name}</td>
                        <td> {item.Category.name}</td>
                        <td>Ksh {item.price}</td>
                        <td>Ksh {item.discount} %</td>

                        <td> {item.description}</td>
                        <td>{item.countInStock}</td>
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

export default ProductList;
