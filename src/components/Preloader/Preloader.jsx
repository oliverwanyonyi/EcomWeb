import React from 'react'
import loader from "../../assets/loader.gif"

const Preloader = () => {
  return (
    <div className='loader py-3'>
        <div className="d-flex justify-content-center align-items-center">
            <div className="loader-img-container">
            <img src={loader} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Preloader