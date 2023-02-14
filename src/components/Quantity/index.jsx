import React from 'react'
import { AppState } from '../../Store/store'
import './quantity.css'
const index = ({qty,item}) => {
  const{dispatch} = AppState()
  const updateCart = (item,quantity) =>{
         dispatch({type:"ADD_TO_CART",payload:{item:{...item,quantity}}})
  }
  return (
    <>
    <div class="qty-container rd-c-sm">
    <button class="decrement-btn" disabled={qty === 1} onClick={()=>updateCart(item,qty-1)}>-</button>
    <span class="counter">{qty}</span>
    <button class="increment-btn" onClick={()=>updateCart(item,qty+1)}>+</button>
  </div>
  </>
  )
}

export default index