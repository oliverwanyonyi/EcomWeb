import { useState } from "react";
import SideBar from "../../../components/Admin/SideBar/SideBar";
import Analytics from "../../../components/Admin/Analytics/Anayltics";
import "./main.css";
import { useResolvedPath } from "react-router-dom";
import CreateProduct from "../../../components/Admin/ProductCreate/CreateProduct";
import Category from "../../../components/Admin/Category/Category";
import ProductList from "../../../components/Admin/ProductList/ProductList";
import List from "../../../components/Admin/CategoryList/List";
import OrderList from "../../../components/Admin/OrderList/OrderList";
import UpdateOrder from "../../../components/Admin/UpdateOrder/UpdateOrder";
import SubCategory from "../../../components/Admin/SubCategory/SubCategory";
import SubCategoryList from "../../../components/Admin/SubCategoryList/SubCategoryList";

const Main = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const currPath = useResolvedPath().pathname;
  console.log(currPath.split('/'));
  return (
    <div className={showSideBar ? "sidebar-active" : ""}>
      <SideBar />
      <div className="main-content">
        <nav className="admin-header">
          <div className="d-flex justify-content-between align-items-center bg-white px-2 py-3">
            <span
              className={
                showSideBar
                  ? "fas fa-arrow-alt-circle-left nav-icon"
                  : "fas fa-arrow-alt-circle-right nav-icon"
              }
              onClick={() => setShowSideBar(!showSideBar)}
            ></span>

            <div className="admin-header-nav-left">
              <ul className="nav-list d-flex align-items-center">
                <li className="nav-list-item">
                  <span className="fas fa-bell"></span>
                </li>
                <li className="nav-list-item">
                  <div
                    className="nav-list-item-label"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="l-txt">Oliver Wanyonyi</span>
                    <span className="fas fa-chevron-down"></span>
                  </div>
                  {showMenu && (
                    <ul className="nav-list-item-sub">
                      <li className="">
                        <button>Logout</button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {currPath === "/admin" ? (
          <Analytics />
        ) : currPath === "/admin/product/new" ? (
          <CreateProduct />
        ) : currPath === "/admin/categories/new" ? (
          <Category />
        ) : currPath === "/admin/products/all" ? (
          <ProductList />
        ) : currPath === "/admin/categories/all" ? (
          <List />
        ) : currPath === "/admin/orders/all" ? (
          <OrderList />
        ) : currPath === `/admin/orders/${currPath.split('/')[3]}/update` ? (
          <UpdateOrder />
        ) : currPath === '/admin/sub_category'? (
          <SubCategory/>
        ):currPath ==="/admin/sub_categories/all"?<SubCategoryList/>:""}
      </div>
    </div>
  );
};

export default Main;
