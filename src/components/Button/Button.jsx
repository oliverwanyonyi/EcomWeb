import { useRef } from "react";
import "./button.css";

const Button = ({ children, type, background, loading, handleAddToCart}) => {
  const buttonRef = useRef(null);
  const handleClick = (e) => {
    console.log(e.target.closest('.button'),e.clientX,e.target.offsetLeft);
    const overlay = document.createElement("span");
    overlay.classList.add("overlay");
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    overlay.style.left = x + "px";
    overlay.style.top = y + "px";
    buttonRef.current.appendChild(overlay);
    {
      handleAddToCart && handleAddToCart();
    }
   
    setTimeout(() => {
      overlay.remove();
    }, 500);
  };
  return (
    <div>
      <button
        className={background ? "button " + background : "button"}
        id={loading ?"loading":''}
        ref={buttonRef}
        type={type}
        onClick={handleClick}
        disabled={loading}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
