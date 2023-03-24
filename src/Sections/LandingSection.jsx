import { Link } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import { useFetch } from "../hooks/useFetch";
import './landing.css'
const LandingSection = () => {
  const{data,loading} = useFetch('/categories/categories&sub-categories')
  return (
    <div className="landing-main">
      <div className="container">
        <div className="bg-white landing-wrapper">
          <div className="row">
            <div className="col-md-3 desktop-visible">

              <div className="categories-container">
                <h2 className="categories-header">Categories</h2>
                <ul className="categories-list">
                  {data?.categories.map(cate=>( <li className="category-list-item" key={cate.id}>
                    <span className="parent-category-title">{cate.name}</span>
                    <ul className="sub-category-list-items">
                    {cate.sub_categories.map((sub_cate,idx)=>(<li className="sub-category-list-item" key={idx}><Link to={"/shop?slug="+sub_cate.slug}>{sub_cate.name}</Link></li>))}
                    </ul>
                    </li>))}
                  {/* <li className="category-list-item">
                    <span className="parent-category-title">Clothings</span>
                    <ul className="sub-category-list-items">
                      <li className="sub-category-list-item">
                        <Link to="/clothing/slug">Clothing for men</Link>
                       
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Clothing for women</Link>
                        
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Clothing for kids</Link>
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Unisex Clothings</Link>

                      </li>
                    </ul>
                  </li>

                  <li className="category-list-item">
                    <span className="parent-category-title">
                      Food and Beverage
                    </span>
                    <ul className="sub-category-list-items">
                      <li className="sub-category-list-item">
                        <Link to="/clothing/slug">Bread</Link>
                       
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Water</Link>
                        
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Rice</Link>
                      </li>
                      <li className="sub-category-list-item">
                      <Link to="/clothing/slug">Fish</Link>

                      </li>
                    </ul>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-md-9">
                <Slider/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
