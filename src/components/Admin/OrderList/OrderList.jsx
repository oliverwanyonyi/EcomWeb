import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Message from "../../MessageBox/Message";
import Spinner from "../../Preloader/Spinner";
import Table from "../Table/Table";

const OrderList = () => {
  const { data, loading } = useFetch("/orders/all");
 
  return (
    <div className="container-fluid">
      <Table>
        <div className="page-header">Orders</div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Paid</th>
                    <th>Paid At</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Date Ordered</th>
                    <th>Date delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Spinner />
                  ) : (
                    data?.orders?.length === 0 ? <Message type="order" msg="No Orders Found" />:  data?.orders.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.id}</td>
                        <td>
                          {item.paid ? (
                            <span className="success">Paid</span>
                          ) : (
                            <span className="info">Not paid</span>
                          )}
                        </td>
                        <td>
                          {item.paid ? (
                            <span className="success">
                              Paid On {item.paidAt}
                            </span>
                          ) : (
                            <span className="info">Not paid</span>
                          )}
                        </td>
                        <td>Ksh {item.orderTotal}</td>
                        <td>
                          {item.status === "placed" ? (
                            <span className="placed">{item.status}</span>
                          ) : item.status === "shipped" ? (
                            <span className="shipped">{item.status}</span>
                          ) : item.status === "ready for pickup" ? (
                            <span className="ready success status">
                              {item.status}
                            </span>
                          ) : item.status === "delivered" ? (
                            <span className="success status">
                              {item.status}
                            </span>
                          ) : (
                            <span className="status cancelled">
                              {item.status}
                            </span>
                          )}
                        </td>

                        <td> {item.paymentMethod}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          {item.delivered
                            ?"Delivered on "+ item.deliveredAt
                            : "Not yet delivered"}
                        </td>

                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-danger">Delete</button>
                            <button className="btn btn-primary">
                              <Link to={`/admin/orders/${item.id}/update`}>Edit</Link>
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

export default OrderList;
