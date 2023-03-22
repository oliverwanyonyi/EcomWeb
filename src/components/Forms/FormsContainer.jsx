import React from "react";
import "./forms.css";
const FormsContainer = ({children}) => {
  return <div className="container-fluid py-2">
    <div className="px-2 py-1 bg-white bg-none">
{children}</div>
  </div>;
};

export default FormsContainer;
