import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppState } from "../../Store/store";
import Message from "../MessageBox/Message";
import logo from "../../assets/shopyetu.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { state, auth,setShowCategories,showCategories } = AppState();
  const [showSearch, setShowSearch] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/shop?search_term=" + searchTerm);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const navToHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const toggleSidebar = () => {
    setShowCategories((prev) => !prev);
    if(showSearch === true){
      setShowSearch(false)
      setShowCategories(false)
    }
  };
  useEffect(() => {
    const hideSearch = () => {
      if (window.innerWidth > 768) {
        setShowSearch(false);
      }
    };
    window.addEventListener("resize", hideSearch);
    return () => {
      window.removeEventListener("resize", hideSearch);
    };
  }, []);

  return (
    <nav className={showSearch ? "nav search" : "nav"}>
      <div className="nav-container">
        <div className="nav-brand" onClick={navToHome}>
          <img src={logo} alt="Shop Yetu" />
        </div>
        <div className="search-bar">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Iam looking for..."
              onChange={(e) => setSearchTerm(e.target.value)}
              id=""
            />
            <button className="fas fa-search search-btn" type="submit"></button>
          </form>
        </div>

        <div className="nav-right">
          <div className="nav-right-items">
            <div
              className="nav-right-item search-trigger-par mobile-visible"
              onClick={toggleSearch}
            >
              <i className="fas fa-search search-bar-trigger"></i>
            </div>
            <div className="nav-right-item mobile-visible">
              <div className={showSearch || showCategories ?"hamburger-container active":"hamburger-container"} onClick={toggleSidebar}>
                <div className="hamburger top"></div>
                <div className="hamburger middle"></div>
                <div className="hamburger bottom"></div>
              </div>
            </div>

            <div className="nav-right-item desktop-visible">
              <span className="item-icon">
                <i className="fas fa-heart"></i>
                <span className="items-count">0</span>
              </span>
              <span className="item-label">Wish list</span>
            </div>
            <div className="nav-right-item desktop-visible has-dropdown">
              <span className="item-icon">
                <i className="fas fa-user"></i>
              </span>
              <span className="item-label">
                Account <span className="fas fa-chevron-down icon"></span>
              </span>
              <div className="dropdown-box">
                <ul className="dropdown-items">
                  {auth?.access_token ? (
                    <li className="dropdown-item">
                      <Link to="/dashboard/profile">Profile</Link>
                    </li>
                  ) : (
                    <li className="dropdown-item">
                      <Link to="/register">Create Account or Login</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="nav-right-item desktop-visible has-dropdown mini-cart-pr">
              <span className="item-icon" onClick={() => navigate("/cart")}>
                <i className="fas fa-shopping-basket"></i>
                <span className="items-count">
                  {state.cart.reduce((acc, item) => item.quantity + acc, 0)}
                </span>
              </span>
              <span className="item-label">Cart</span>

              <div className="mini-cart dropdown-box">
                <div className="mini-cart-items">
                  {state.cart.map((item) => (
                    <div className="mini-cart-item" key={item.id}>
                      <div className="item-details">
                        <Link to="/detail" className="item-title">
                          <h2>{item.title}</h2>
                        </Link>
                        <p>
                          <span className="product-qty">{item.quantity}</span> x
                          <span className="product-price">{item.price}</span>
                        </p>
                      </div>
                      <div className="item-thumb">
                        <img src={item.thumb} alt={item.title} />
                      </div>
                    </div>
                  ))}
                </div>
                {state.cart.length === 0 ? (
                  <Message type="cart" />
                ) : (
                  <>
                    <div className="mini-cart-summary">
                      <h4 className="summary-key">Total</h4>
                      <h4 className="summary-value">
                        Ksh{" "}
                        {state.cart
                          .reduce(
                            (acc, item) => item.price * item.quantity + acc,
                            0
                          )
                          .toFixed(0)}
                      </h4>
                    </div>
                    <div className="mini-cart-footer">
                      <Link to="/cart" className="btn view-cart">
                        Go to cart
                      </Link>
                      <Link to="/checkout" className="btn checkout-btn">
                        Checkout
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
