import React from 'react';

const Sidebar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { name: 'SHOP BY CATEGORY', icon: 'fas fa-th-large', filter: 'shop' },
    { name: 'BEST FOR', icon: 'fas fa-star', filter: 'best' },
    { name: 'ALTERNATIVE TO', icon: 'fas fa-random', filter: 'alternative' },
    { name: 'FEATURES', icon: 'fas fa-list', filter: 'features' },
    { name: 'PLAN TYPE', icon: 'fas fa-layer-group', filter: 'plan' },
    { name: 'PRICE RANGE', icon: 'fas fa-tags', filter: 'price' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className={activeCategory === cat.filter ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onCategoryChange(cat.filter);
            }}
          >
            <i className={cat.icon}></i> {cat.name}
          </a>
        ))}
      </nav>
      <div className="premium-card">
        <h4>PREMIUM DEALS</h4>
        <p>Get exclusive access to the highest performing software assets.</p>
        <button className="btn-primary">Explore All</button>
      </div>
    </aside>
  );
};

export default Sidebar;
