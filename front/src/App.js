import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Register from './Components/Account/Register';
import Login from './Components/Account/Login';
import Logout from './Components/Account/Logout';
import CreateProduct from './Components/Products/CreateProduct';
import ProtectedRoute from './utils/ProtectedRoute';
import withAuth from './utils/withAuth';
import ProductDetail from './Components/Products/ProductDetail';
import UserProfile from './Components/Account/UserProfile';
import PublicRoute from './utils/PublicRoute';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Cart/Checkout';
import Orders from './Components/Orders/Orders';
import OrderDetail from './Components/Orders/OrderDetail';
import Bonus from './Components/Bonus/Bonus';
import Setting from './Components/Settings/Settings';
import { useAuth } from './utils/AuthContext';

import LandingPage from './Components/LandingPage/LandingPage';
import EditOrder from './Components/Orders/EditOrder';
import HomePage from './Components/HomePage/HomePage';
import ProductsPage from './Components/Products/ProductsPage';

const MainNavbar = withAuth(Navbar);

function App() {
  const { role } = useAuth(); // Access the auth context here

  return (
    <div className='app-container'>
      <MainNavbar />
      <div className='main-content'>
        <div className='content-section'>
          <Routes>
            <Route path='/' element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/product/:id' element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path='/logout' element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route exact path='/product/create/' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path='/orders/edit/:id' element={<ProtectedRoute><EditOrder /></ProtectedRoute>} />
            <Route path='/bonus' element={<ProtectedRoute><Bonus /></ProtectedRoute>} />
            <Route path='/setting' element={<ProtectedRoute><Setting /></ProtectedRoute>} />
            <Route path='/all/products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
