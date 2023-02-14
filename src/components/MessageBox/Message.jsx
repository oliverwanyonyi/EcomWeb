import React from 'react'
import {Link} from 'react-router-dom'
import './message.css'
const Message = () => {
  return (
    <div className='message-box'>
        <h3>Your cart is empty <Link to='/'>Continue Shopping</Link></h3>
    </div>
  )
}

export default Message