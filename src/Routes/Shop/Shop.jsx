import './shop.css'
import Product from '../../components/Product/Product';
import Navbar from '../../components/Navbar/Navbar';

const Shop = () => {
  return (
    <>
    <Navbar/>
    
    <section className="shop-section py-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-3 col-xl-2 ">
            <div className="bg-white px-3 py-3">
              <div className="section-header">
                <h3 className="title pb-3">Filter By</h3>
              </div>
              <div className="d-flex flex-column">
                <div className="filter-item mb-3">
                  <h3 className="filter-item-label">Category</h3>
                  <ul className="filter-item-list">
                    <li className="item">
                      <input type="checkbox" name="shoes" id="shoes" />
                      <label for="shoes">Shoes</label>
                    </li>
                    <li className="item">
                      <input type="checkbox" name="clothes" id="clothes" />
                      <label for="clothes">Clothes</label>
                    </li>
                    <li className="item">
                      <input type="checkbox" name="bags" id="bags" />
                      <label for="bags">Bags</label>
                    </li>
                    <li className="item">
                      <input
                        type="checkbox"
                        name="accessories"
                        id="accessories"
                      />
                      <label for="accessories">Accessories</label>
                    </li>
                  </ul>
                </div>

                {/* <div className="filter-item mb-3">
                  <h3 className="filter-item-label">Brand</h3>
                  <ul className="filter-item-list">
                    <li className="item">
                      <input type="checkbox" name="nike" id="nike" />
                      <label for="shoes">Nike</label>
                    </li>

                    <li className="item mb-3">
                      <input type="checkbox" name="chuckk" id="nike" />
                      <label for="shoes">chucktaylor</label>
                    </li>
                  </ul>
                </div> */}
                <div className="filter-item mb-3">
                  <h3 className="filter-item-label">Availability</h3>
                  <ul className="filter-item-list">
                    <li className="item">
                      <input
                        type="checkbox"
                        name="outofstock"
                        id="outofstock"
                      />
                      <label for="outofstock">Include out of stock</label>
                    </li>
                  </ul>
                </div>

                <div className="filter-item">
                  <h3 className="filter-item-label">Price</h3>
                  <span className="price-lable">Price greater than 1000ksh</span>
                  <input type="range" name="price" id="price" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-lg-9 col-xl-10">
            <div className="bg-white py-5 px-3">
              <div className="section-header">
                <div className="d-flex justify-content-between align-items-center pb-4">
                  <div className="section-header-item d-sm-none">
                    <button className="show-filters-btn  ">Show Filters</button>
                  </div>
                  <div className="section-header-item">result for "Airforce"</div>
                  <div className="section-header-item">
                    <label for="sort">Sort by</label>
                    <select name="sort" id="sort">
                      <option value="newest">Newest</option>
                      <option value="newest">Price low to High</option>
                      <option value="newest">Price High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 ">
               {/* <Product/> */}
                <div>
                  <div className="product-card product">
                    <div className="product-image">
                      <div className="wish-btn">
                        <span className="btn-title">add to wishlist</span>
                        <i className="fas fa-heart"></i>
                      </div>

                      <a href="http://localhost:5500/product-details.html">
                        <img src='' />
                      </a>
                      <button className="btn cart-btn">
                        <span className="btn-icon fas fa-shopping-basket"></span>
                        Add to cart
                      </button>
                    </div>
                    <div className="product-body">
                      <a href="http://">
                        <h2 className="product-title">
                          Breathable Black chucktaylor
                        </h2>
                      </a>
                      <div className="product-price">
                        <p className="rg-p">Ksh 3000</p>

                        <p className="ds-p">Ksh 2800</p>
                      </div>
                      <div className="review">
                        <div className="stars-container">
                          <span className="fas fa-star"></span>
                          <span className="fas fa-star"></span>
                          <span className="fas fa-star"></span>
                          <span className="fas fa-star"></span>
                          <span className="fas fa-star"></span>
                        </div>
                        <p className="review-title">(10) reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Shop;
