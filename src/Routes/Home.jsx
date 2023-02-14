import BottomBar from '../components/BottomBar/BottomBar'
import Navbar from '../components/Navbar/Navbar'
import ProductsByCats from '../components/ProductByCategory/ProductsByCats'

const Home = () => {
  return (
    <main className="main">
       <Navbar/>
     <ProductsByCats/>  
     <BottomBar/>
    </main>
  )
}

export default Home