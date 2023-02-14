import "./product_gallery.css";
const index = ({ image }) => {
  return (
    <>
    
        <div className="row flex-column-reverse flex-md-row g-1">
          <div className="col .col-md-2 text-center">
            <div class="product-gallery gap d-flex flex-md-column align-items-center">
              {[image,image,image]?.map((img,idx)=>(<div class="gallery-img" key={idx}>
                <img src={img} alt="" />
              </div>))}
              
             
            </div>
          </div>
          <div className="col col-md-10">
            <div class="main-product-image">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
     
    </>
  );
};

export default index;
