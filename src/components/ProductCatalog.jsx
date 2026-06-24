import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductCatalog({ products, onAddToCart, onViewDetails, activeCategory, setActiveCategory }) {

  const categories = ['Recommended', 'Frame', 'Hamper', 'Keychain', 'Mug', 'Bracelet'];

  const filteredProducts = activeCategory === 'Recommended'
    ? (products.some(p => p.recommended) ? products.filter(p => p.recommended) : products)
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="catalog-header">
          <h2 className="catalog-section-title">Explore Our Collection</h2>
          <p className="catalog-subtitle">Pick something cute, personalize it, and send a smile!</p>
        </div>

        {/* Category Filters */}
        <div className="category-filters-container">
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`neo-btn filter-btn ${activeCategory === cat ? 'active-filter' : 'neo-btn-pink'}`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="empty-catalog neo-card">
            <h3>No gifts found in this category!</h3>
            <p>Check back later or explore our other cute collections.</p>
          </div>
        )}
      </div>

      <style>{`
        .catalog-section {
          padding: 6rem 0;
          background-color: var(--bg-cream);
          position: relative;
        }

        .catalog-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .catalog-section-title {
          font-size: 2.8rem;
          margin-bottom: 0.75rem;
          letter-spacing: -1px;
        }

        .catalog-subtitle {
          font-size: 1.15rem;
          color: #555;
          font-weight: 500;
        }

        .category-filters-container {
          display: flex;
          justify-content: center;
          margin-bottom: 3.5rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
        }

        .category-filters {
          display: flex;
          gap: 1rem;
          flex-wrap: nowrap;
        }

        .filter-btn {
          font-size: 0.95rem;
          padding: 0.6rem 1.2rem;
          white-space: nowrap;
        }

        .active-filter {
          background-color: var(--bg-dark) !important;
          color: var(--bg-yellow) !important;
          transform: translate(2px, 2px);
          box-shadow: 0px 0px 0px #1E1E1E !important;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
        }

        .empty-catalog {
          text-align: center;
          padding: 4rem;
          background-color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
        }

        .empty-catalog h3 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 991px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
          
          .catalog-section-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .category-filters-container {
            justify-content: flex-start;
          }
          
          .catalog-section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
