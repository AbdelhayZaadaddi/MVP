import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Products from './Components/Products';
import ProductPage from './Components/ProductPage';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import CreateProduct from './Components/CreateProduct';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Products />} />
        <Route  path="/product/1" element={<ProductPage />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/product/create" element={<CreateProduct />} />


      </Routes>
    </Router>
  );
}

export default App;
