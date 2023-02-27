import React from 'react'
import {Link} from 'react-router-dom'
import './message.css'
const Message = ({type,msg}) => {
  return (
    <div className='message-box'>
      {type==='cart'?<h3>Your cart is empty <Link to='/'>Continue Shopping</Link></h3>:
        <h3>{msg}</h3>}
    </div>
  )
}

export default Message