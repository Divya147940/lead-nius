import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import BottomSection from './components/BottomSection';

import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import SignupPage from './components/SignupPage';
import RegistrationsView from './components/RegistrationsView';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('shop');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'shop' ||
      product.category.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <CartProvider>
      <div className="app">
        <Navbar 
          onSearch={setSearchQuery} 
          onRegisterClick={() => setShowSignup(true)} 
          onSoftwareClick={() => {
            setSelectedProductId(null);
            setShowSignup(false);
            setShowRegistrations(false);
          }}
          isDetailView={!!selectedProductId}
        />
        
        <div className="app-container">
          {showRegistrations ? (
            <RegistrationsView onBack={() => setShowRegistrations(false)} />
          ) : showSignup ? (
            <SignupPage onBack={() => setShowSignup(false)} />
          ) : (
            <>
              {!selectedProduct && (
                <Sidebar 
                  activeCategory={activeCategory} 
                  onCategoryChange={(cat) => {
                    setActiveCategory(cat);
                    setSelectedProductId(null); // Clear detail view on category change
                  }} 
                />
              )}
              
              <main className={`main-content ${selectedProduct ? 'full-width' : ''}`}>
                <div className={`content-body ${selectedProduct ? 'content-body-detail' : ''}`}>
                  {selectedProduct ? (
                    <ProductDetail 
                      product={selectedProduct} 
                      onBack={() => setSelectedProductId(null)} 
                    />
                  ) : (
                    <>
                      <Hero />
                      <ProductGrid 
                        products={filteredProducts} 
                        onProductClick={setSelectedProductId} 
                      />
                      <BottomSection onRegisterClick={() => setShowSignup(true)} />
                    </>
                  )}
                </div>
              </main>
            </>
          )}
        </div>
        
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
