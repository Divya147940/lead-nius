import React from 'react';
import { products } from '../data/products';
import './Hero.css';

const Hero = () => {
  const totalProducts = products.length;

  return (
    <div className="hero-header">
      <div className="hero-left">
        <h2 className="hero-title-main">Browse software</h2>
        <p className="product-count">{totalProducts} products</p>
      </div>

      <div className="hero-right">
        <span className="sort-label">Sort by:</span>
        <div className="sort-select-wrapper">
          <select className="sort-select" defaultValue="recommended">
            <option value="recommended">Recommended</option>
            <option value="latest">Latest</option>
            <option value="reviews"># customer reviews</option>
            <option value="rating">Avg customer rating</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="ending">Ending soon</option>
            <option value="quantity">Quantity remaining</option>
          </select>
          <span className="sort-icon">
            <i className="fas fa-chevron-down"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
