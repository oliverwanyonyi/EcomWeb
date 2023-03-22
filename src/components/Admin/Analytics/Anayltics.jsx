import { useFetch } from '../../../hooks/useFetch'
import Preloader from '../../Preloader/Preloader';
import './analytics.css'
const Anayltics = () => {
    const {data,loading} = useFetch("/analytics");
  return (
    <div className='analytics'>
        {loading?<Preloader/>:
        <div className="row g-2">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white py-2 px-3 ecom-summary-item bg-lt-green">
                    <h3 className="summary-title">Total Orders</h3>
                    <div className="icon">
                        <span className="fas fa-shopping-basket"></span>
                    </div>
                    <span className="summary-count">{data.orderCount}</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white py-2 px-3 ecom-summary-item bg-lt-orange">
                    <h3 className="summary-title">Total Customers</h3>
                    <div className="icon">
                        <span className="fas fa-users"></span>
                    </div>
                    <span className="summary-count">{data.userCount}</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white py-2 px-3 ecom-summary-item bg-lt-red">
                    <h3 className="summary-title">Total Products</h3>
                    <div className="icon">
                        <span className="fas fa-store"></span>
                    </div>
                    <span className="summary-count">{data.productCount}</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white py-2 px-3 ecom-summary-item">
                    <h3 className="summary-title">Total Categories</h3>
                    <div className="icon">
                        <span className="fas fa-th"></span>
                    </div>
                    <span className="summary-count">{data.categoriesCount}</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white py-2 px-3 ecom-summary-item">
                    <h3 className="summary-title">Total Income</h3>
                    <div className="icon">
                        <span className="fas fa-dollar-sign"></span>
                    </div>
                    <span className="summary-count">{data.orderTotalAmount}</span>
                </div>
            </div>
        </div>
}
    </div>
  )
}

export default Anayltics