import React from "react";
import Table from "../Table/Table";

const ProductList = () => {
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
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Description</th>
                    <th>Instock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> Test Name</td>
                    <td> Shoes For All</td>
                    <td> Ksh 2000</td>
                    <td> Nike</td>
                    <td> Nike is a nice shoes</td>
                    <td>20</td>
                  </tr>

                  <tr>
                    <td> Test Name</td>
                    <td> Shoes For All</td>
                    <td> Ksh 2000</td>
                    <td> Nike</td>
                    <td> Nike is a nice shoes</td>
                    <td>20</td>
                  </tr>
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
