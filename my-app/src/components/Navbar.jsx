import React from 'react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch, onRegisterClick, onSoftwareClick, isDetailView }) => {
  const { cartCount, setIsCartOpen } = useCart();
  return (
    <header className="navbar">
      <div className={`navbar-container ${isDetailView ? 'navbar-container-detail' : ''}`}>
        <div className="navbar-left">
          <div className="logo-wrap">
            <h1 className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', gap: '2px', alignItems: 'flex-start' }}>
              <span style={{ 
                fontSize: '1.8rem', 
                fontWeight: 800, 
                background: 'linear-gradient(90deg, #1e40af 0%, #2173df 50%, #38bdf8 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
              }}>Leadnius</span>
              <span style={{ 
                fontSize: '1rem', 
                fontWeight: 800, 
                color: '#334155', 
                letterSpacing: '0px',
                paddingLeft: '0.8rem'
              }}>Community</span>
            </h1>
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
