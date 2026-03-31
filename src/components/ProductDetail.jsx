import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = ({ product, onBack }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      <section className="detail-header-section">
        <div className="detail-hero-grid">
          <div className="detail-main-info">
            <nav className="breadcrumb">
              <span>Software</span>
              <i className="fas fa-chevron-right separator"></i>
              <span className="current">{product.name}</span>
            </nav>

            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-subtitle">{product.subtitle}</p>
            
            <div className="detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}></i>
                ))}
              </div>
              <span className="review-count">
                {product.rating} <span className="reviews-label">({product.reviews} reviews)</span>
              </span>
            </div>

            <div className="detail-pricing">
              <div className="price-stack">
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <div className="current-price-wrap">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className="discount">-{discount}% OFF</span>
                </div>
              </div>
              <button className="btn-buy-now">Buy now</button>
              <button className="btn-add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
            </div>

            <div className="detail-image-main">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="glance-card">
              <h3>AT A GLANCE</h3>
              <div className="glance-content">
                <div className="glance-section">
                  <p><i className="fas fa-random"></i> Alternative to</p>
                  <div className="tag-list">
                    {product.alternatives.map(alt => <span key={alt} className="tag">{alt}</span>)}
                  </div>
                </div>

                <div className="glance-section">
                  <p><i className="fas fa-hub"></i> Integrations</p>
                  <div className="tag-list">
                    {product.integrations.map(int => <span key={int} className="tag">{int}</span>)}
                  </div>
                </div>

                <div className="glance-section">
                  <p><i className="fas fa-user-check"></i> Best for</p>
                  <div className="tag-list">
                    {product.bestFor.map(bf => <span key={bf} className="tag-best">{bf}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="features-container">
        {product.features.map((feature, index) => (
          <div key={index} className={`feature-wrapper ${index === 1 ? 'bg-light' : ''}`}>
            <div className="feature-item-content">
              <div className={`feature-grid ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="feature-media">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="feature-text">
                  <span className={`feature-tag ${index === 1 ? 'secondary' : ''}`}>{feature.tag || 'FEATURE'}</span>
                  <h2 className="feature-title">{feature.title}</h2>
                  <p className="feature-desc">{feature.desc}</p>
                  <ul className="feature-bullets">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i}>
                        <span className={`bullet-icon ${index === 1 ? 'secondary' : ''}`}>
                          <i className={index === 1 ? 'fas fa-shield' : 'fas fa-check'}></i>
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="pricing-table-section">
        <div className="section-header">
          <h2>Choose your license tier</h2>
          <p>Scalable plans for every stage of your business growth.</p>
        </div>
        <div className="tiers-grid">
          {product.tiers.map((tier, index) => (
            <div key={index} className={`tier-card ${tier.popular ? 'popular' : ''}`}>
              {tier.popular && <div className="popular-badge">Most Popular</div>}
              <div className="tier-content-top">
                <h4>{tier.name}</h4>
                <div className="tier-price">
                  <span className="amount">${tier.price}</span>
                  <span className="period">/lifetime</span>
                </div>
                <p className="tier-desc">{tier.desc}</p>
              </div>
              <ul className="tier-features">
                {tier.features.map((f, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`btn-tier ${tier.popular ? 'primary' : 'outline'}`}>Buy now</button>
            </div>
          ))}
        </div>
      </section>
      <section className="community-buzz-section">
        <div className="buzz-header">
          <h2>Community Buzz</h2>
          <div className="buzz-tabs">
            <button className="tab-btn">Questions (24)</button>
            <button className="tab-btn active">Reviews (174)</button>
          </div>
        </div>

        <div className="review-card">
          <div className="review-user">
            <div className="user-avatar">JD</div>
            <div className="user-meta">
              <span className="user-name">Jason D.</span>
              <span className="verified-badge">Verified Buyer</span>
              <div className="user-stars">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
            </div>
          </div>
          <p className="review-text">
            "Switched from Mailgun and haven't looked back. The deliverability is stellar and the UI is actually intuitive. 
            Best marketplace purchase this year!"
          </p>
        </div>

        <div className="ask-founder-box">
          <p>Have a question before you buy?</p>
          <button className="btn-ask">Ask the founder</button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
