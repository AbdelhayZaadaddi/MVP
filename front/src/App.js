import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Products from './Components/Products/Products';
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

const MainNavbar = withAuth(Navbar);

function App() {
    return (
        <Router>
            <MainNavbar />
            <Routes>
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route exact path='/' element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
                <Route exact path="/product/create/" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
