import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Home from './Pages/home';
import OurProducts from './Pages/OurProducts';
import ProductDetails from './Pages/ProductDetails';
import Products from './Our Products/Products';
import Services from './Our Products/Services';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/our_products' element={<OurProducts/>} />
      <Route path='/product_details' element={<ProductDetails/>} />
      <Route path='/products/solutions' element={<Products/>} />
      <Route path='/products/services' element={<Services/>} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
