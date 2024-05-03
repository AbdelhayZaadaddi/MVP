import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Products from './components/products/Products';
import ProductPage from './components/products/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Products />} />
        <Route  path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
