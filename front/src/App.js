import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Products from './Components/Products';
import ProductPage from './Components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Products />} />
        <Route  path="/product/:product_id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
