import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.css"
const ProfileSidebar = ({sidebarLinks}) => {
    const [selected,setSelected] = useState(0)
  return (
    <div className='profile-sidebar-container sidebar-container'>
        <div className="bg-white px-3 py-1">
        <ul className="sidebar-list-items">
            {sidebarLinks.map((link,idx)=>( <li onClick={()=>setSelected(idx)} className={idx === selected?"sidebar-list-item active":"sidebar-list-item"} key={idx}>
                <Link to={link.path} className="sidebar-list-item-link">{link.title}</Link>
            </li>))}
                 
         </ul>
        </div>
        
    </div>
  )
}

export default ProfileSidebar