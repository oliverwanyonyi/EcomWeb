import React from "react";
import { Link } from "react-router-dom";
import './breadcrump.css'
const BreadCrump = ({hierachies}) => {
  return (
    <div className="container site-navigation">
      <div className="bg-white py-lg rd-c-sm px-3">
        <ul className="site-nav-items">
         
          {hierachies.map(hierachy=>{
            if(hierachy === hierachies[hierachies.length - 1]){
              return <li className="site-nav-item">
                {hierachy.name}
              </li>
            }else{
              return <li className="site-nav-item">
            <Link to={hierachy.path} className="site-nav-link">
              
             {hierachy.name}
            </Link>
            </li>
            }
          })}
        
        </ul>
      </div>
    </div>
  );
};

export default BreadCrump;
