import React from 'react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch, onRegisterClick, onSoftwareClick, isDetailView }) => {
  const { cartCount, setIsCartOpen } = useCart();
  return (
    <header className="navbar">
      <div className={`navbar-container ${isDetailView ? 'navbar-container-detail' : ''}`}>
        <div className="navbar-left">
          <div className="logo-wrap">
            <h1 className="logo">Leadnius Community</h1>
          </div>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search products (⌘+k)" 
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        <nav className="navbar-center">
          <a 
            href="#" 
            className={!isDetailView ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              onSoftwareClick();
            }}
          >Software</a>
          <a href="#">New Arrival</a>
          <a href="#" className={isDetailView ? 'active' : ''}>
            {isDetailView ? 'Software Detail' : 'Collaborate'}
          </a>

        </nav>
        <div className="navbar-right">
          <div className="cart-icon-wrap" onClick={() => setIsCartOpen(true)}>
            <div className="cart-icon-inner">
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <span className="cart-text">Cart</span>
          </div>
          <button className="btn-login" onClick={onRegisterClick}>Register Now</button>
        </div>


      </div>
    </header>
  );
};

export default Navbar;
