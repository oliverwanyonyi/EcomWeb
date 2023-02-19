import React from "react";
import "./forms.css";
const FormsContainer = ({children}) => {
  return <div className="container-fluid py-2">
    <div className="bg-white px-2 py-1">
{children}</div>
  </div>;
};

export default FormsContainer;
