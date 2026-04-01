import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-container">
          <div className="cart-header">
            <h2>Shopping Cart ({cartItems.length})</h2>
            <button className="btn-close" onClick={() => setIsCartOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="cart-body">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button className="btn-browse" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <button className="btn-remove-lite" onClick={() => removeFromCart(item.id)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <p className="cart-item-category">{item.category}</p>
                      <div className="cart-item-footer">
                        <div className="qty-selector">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <p className="cart-item-price-total">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-checkout-footer">
              <div className="summary-row">
                <span className="label">Total Amount</span>
                <span className="value">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="footer-note">Free worldwide shipping & 60-day money back guarantee.</p>
              <div className="footer-actions">
                <button className="btn-continue" onClick={() => setIsCartOpen(false)}>CONTINUE SHOPPING</button>
                <button className="btn-checkout-now">PROCEED TO CHECKOUT</button>
              </div>
              <button className="btn-clear-all" onClick={clearCart}>Clear All Items</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
