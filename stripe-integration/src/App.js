import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import { CartProvider } from './CartContext';
import LoginSignup from './pages/LoginSignup';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = () => setIsAuthenticated(true);
  const logoutUser = () => setIsAuthenticated(false); 

   return (
    <CartProvider>
      <BrowserRouter>
        <NavbarComponent isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
        <Container>
          <Routes>
            <Route index element={isAuthenticated ? <Store /> : <Navigate to="/login" />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="login" element={<LoginSignup loginUser={loginUser} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
