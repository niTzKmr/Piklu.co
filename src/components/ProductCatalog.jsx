import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import ProductCard from './ProductCard';

export default function ProductCatalog({ products, onAddToCart, onViewDetails, activeCategory, setActiveCategory }) {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Recommended', 'Frame', 'Hamper', 'Keychain', 'Mug', 'Bracelet'];

  // Initialize Fuse.js instance
  const fuse = new Fuse(products, {
    keys: [
      { name: 'name', weight: 1.5 },
      { name: 'category', weight: 1.0 },
      { name: 'tags', weight: 1.2 },
      { name: 'description', weight: 0.8 },
      { name: 'specifications.name', weight: 0.5 },
      { name: 'specifications.value', weight: 0.5 }
    ],
    threshold: 0.4,
    ignoreLocation: true
  });

  // Debounce search input value (250ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 250);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // First apply search if search query is active
  const searchedProducts = searchQuery.trim() !== ''
    ? fuse.search(searchQuery).map(result => result.item)
    : products;

  // Then apply category filtering
  const filteredProducts = activeCategory === 'Recommended'
    ? (searchQuery.trim() !== '' 
        ? searchedProducts 
        : (products.some(p => p.recommended) ? products.filter(p => p.recommended) : products))
    : searchedProducts.filter(p => p.category === activeCategory);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="catalog-header">
          <h2 className="catalog-section-title">Explore Our Collection</h2>
          <p className="catalog-subtitle">Pick something cute, personalize it, and send a smile!</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container neo-card">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search keychains, frames, hampers, tags..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
          {inputValue && (
            <button 
              onClick={() => setInputValue('')} 
              className="clear-search-btn"
              aria-label="Clear search"
            >
              ❌
            </button>
          )}
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
              searchQuery={searchQuery}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="empty-catalog neo-card">
            {searchQuery ? (
              <>
                <h3>😢 No items found matching "{searchQuery}"</h3>
                <p style={{ marginBottom: '1.5rem' }}>Try checking your spelling, using different keywords, or clear the search to browse all items.</p>
                <button 
                  onClick={() => { setInputValue(''); setActiveCategory('Recommended'); }} 
                  className="neo-btn neo-btn-pink"
                >
                  <span>Clear Search & Filters 🔄</span>
                </button>
              </>
            ) : (
              <>
                <h3>No gifts found in this category!</h3>
                <p>Check back later or explore our other cute collections.</p>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        /* Search Bar Styles */
        .search-bar-container {
          display: flex;
          align-items: center;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          background-color: #ffffff;
          border: var(--border-thick);
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          box-shadow: var(--shadow-btn);
          transition: var(--transition-smooth);
        }

        .search-bar-container:focus-within {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-btn-hover);
          border-color: var(--bg-dark);
        }

        .search-icon {
          font-size: 1.25rem;
          margin-right: 0.75rem;
          user-select: none;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-dark);
          background: transparent;
        }

        .search-input::placeholder {
          color: #999;
        }

        .clear-search-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0.25rem;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .clear-search-btn:hover {
          transform: scale(1.1);
        }
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
