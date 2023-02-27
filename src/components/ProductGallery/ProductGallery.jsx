import { useState,useRef } from "react";
import "./product_gallery.css";

const ProductGallery = ({ images }) => {
  const [dispayImg, setDisplayImg] = useState(images[0]);

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const handleClick = (idx) => {
    refs.current[idx].classList.toggle("selected");
    setDisplayImg(images[idx])
    for (let i = 0; i < refs.current.length; i++) {
   
      if (i !== idx) {
        refs.current[i].classList.remove('selected')
    
      }
    }
  };
  return (
    <>
      <div className="row flex-column-reverse flex-md-row g-2">
        <div className="col .col-md-2 text-center">
          <div className="product-gallery gap d-flex flex-md-column align-items-center">
            {images.map((img, idx) => (
              <div class={idx === 0 ?"selected gallery-img":"gallery-img"} key={idx} onClick={()=>handleClick(idx)} ref={addRefs}>
                <img src={img.url} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="col col-md-10">
          <div class="main-product-image">
            <img src={dispayImg.url} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
