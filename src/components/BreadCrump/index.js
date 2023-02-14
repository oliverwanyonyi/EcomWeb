import React from "react";
import './breadcrump.css'
const index = () => {
  return (
    <div className="container site-navigation">
      <div className="bg-white py-lg rd-c-sm px-3">
        <ul className="site-nav-items">
          <li className="site-nav-item">
            <a href="" className="site-nav-link">
              
              Home
            </a>
          </li>
          <li className="site-nav-item">
            <a href="" className="site-nav-link">
              
              Shoes
            </a>
          </li>
          <li className="site-nav-item">
            <a href="" className="site-nav-link">
              
              Sports Shoes
            </a>
          </li>
          <li className="site-nav-item active">
            <a href="#" className="site-nav-link" aria-disabled="true">
              Nike Sports Shoes
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
