import { useRef } from "react";
import { Link } from "react-router-dom";
import { links } from "../../../data";

import "./sidebar.css";
const SideBar = () => {
  const handleClick = (idx) => {
    refs.current[idx].classList.toggle("active");
    refs.current[idx].firstElementChild.firstElementChild.nextElementSibling.classList.remove('fa-plus')
    refs.current[idx].firstElementChild.firstElementChild.nextElementSibling.classList.add('fa-minus')
    refs.current[idx].firstElementChild.nextElementSibling.style.height =
      refs.current[idx].firstElementChild.nextElementSibling.scrollHeight + "px";
    for (let i = 0; i < refs.current.length; i++) {
   
      if (i !== idx) {
        refs.current[i].firstElementChild.nextElementSibling.style.height = "0px"
        refs.current[i].firstElementChild.firstElementChild.nextElementSibling.classList.remove('fa-minus')
        refs.current[i].firstElementChild.firstElementChild.nextElementSibling.classList.add('fa-plus')
    
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <Link to="/admin">Shopyetu</Link>
      </div>
      <ul className="sidebar-list-items">
        {links.map((link, idx) => (
          <li
            className="sidebar-list-item"
            onClick={() => handleClick(idx)}
            key={link.id}
            ref={addRefs}
          >
            <div className="list-item-label">
              <span className="list-item-label-text">{link.name}</span>
              <span className="fas fa-plus list-item-label-icon"></span>
            </div>
            <ul className="sub-list-items">
              {link.sub_links.map((sub) => (
                <li className="sub-list-item" key={sub.id}>
                  <Link to={sub.to}>{sub.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
