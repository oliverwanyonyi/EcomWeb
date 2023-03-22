import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Message from "../../MessageBox/Message";
import Spinner from "../../Preloader/Spinner";
import Table from "../Table/Table";

const List = () => {
  const { data: categories, loading, error } = useFetch('/categories');

  return (
    <div className="container-fluid">
      <Table>
        <div className="page-header">Categories</div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    
                    <th>Name</th>
                    <th>Actions</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : (
                     categories?.length === 0 ? 
                      <Message type="order" msg="No Categories Found" />: categories?.map((item) => (
                      <tr>
                        
                        <td> {item.name}</td>
                        
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

export default List;
