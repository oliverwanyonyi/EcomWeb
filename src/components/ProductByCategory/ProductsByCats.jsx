import "./products_by_cats.css";
import Product from "../Product/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { useFetch } from "../../useFetch";
import Message from "../MessageBox/Message";

const ProductsByCats = () => {
  const { data: products, loading, error } = useFetch("/products");

  return (
    <div className="products-section">
      <div className="product-section">
        <div className="container">
          <div className="bg-white rd-c-sm py-3  px-3">
            <div className="products-section-header">
              <h2 className="title">You may like</h2>
            </div>
            <div className="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              {error ? (
                <Message msg={error} />
              ) : loading ? (
                <Preloader />
              ) : (
                products?.map((p) => <Product product={p} key={p.id} />)
              )}
            </div>
            <div className="show__more-section">
              <button className="btn show-more-btn">Show More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCats;
