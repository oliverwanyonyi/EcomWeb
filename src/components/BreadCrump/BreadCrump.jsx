import React from "react";
import { Link } from "react-router-dom";
import './breadcrump.css'
const BreadCrump = ({hierachies}) => {
  return (
    <div className="container site-navigation">
      <div className="bg-white rd-c-sm">
        <ul className="site-nav-items py-lg px-3">
         
          {hierachies.map((hierachy,idx)=>{
            if(hierachy === hierachies[hierachies.length - 1]){
              return <li className="site-nav-item" key={idx}>
                {hierachy.name}
              </li>
            }else{
              return <li className="site-nav-item" key={idx}>
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
