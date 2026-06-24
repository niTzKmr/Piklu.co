import React, { useState } from 'react';

function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return <span>{text}</span>;
  
  const escapedTerms = terms.map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escapedTerms})`, 'gi');
  
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="search-highlight">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function ProductCard({ product, onAddToCart, onViewDetails, searchQuery }) {
  const [loaded, setLoaded] = useState(false);
  const [customText, setCustomText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, customText);
    setCustomText('');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  // Determine category badge background class
  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'Curated Hampers': return 'badge-yellow';
      case 'Custom Keychains': return 'badge-pink';
      case 'Unique Gifts': return 'badge-teal';
      default: return 'badge-orange';
    }
  };

  return (
    <article className="neo-card product-card" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`product-image ${loaded ? 'loaded' : ''}`} 
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      
      <div className="product-body">
        <div className="product-header">
          <h3 className="product-title">
            <HighlightText text={product.name} query={searchQuery} />
          </h3>
          <span className="product-price">₹{product.price}</span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }} 
          className={`neo-btn w-full product-add-btn ${isAdded ? 'neo-btn-pink' : 'neo-btn-dark'}`}
        >
          {isAdded ? 'Added! 🥳' : 'Add to Cart 🛒'}
        </button>
      </div>

      <style>{`
        .search-highlight {
          background-color: var(--bg-yellow);
          color: var(--text-dark);
          padding: 0 2px;
          border-radius: 4px;
          font-weight: 700;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: #ffffff;
          box-shadow: none !important;
        }

        .product-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 240px;
          border-bottom: var(--border-thick);
          background-color: var(--bg-cream);
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background-color: var(--bg-cream);
          opacity: 0;
          transition: opacity 0.4s ease-out, transform 0.5s ease;
        }

        .product-image.loaded {
          opacity: 1;
        }

        .product-card:hover .product-image.loaded {
          transform: scale(1.05);
        }

        .product-category-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          box-shadow: 2px 2px 0px var(--text-dark);
        }

        .badge-yellow { background-color: var(--bg-yellow); color: var(--text-dark); }
        .badge-pink { background-color: var(--bg-pink); color: var(--text-dark); }
        .badge-teal { background-color: var(--bg-teal); color: var(--text-dark); }
        .badge-orange { background-color: var(--bg-orange); color: var(--text-light); }

        .product-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .product-title {
          font-size: 1.05rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .product-price {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.35rem;
          background-color: var(--bg-yellow);
          border: var(--border-medium);
          padding: 0.1rem 0.5rem;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 2px 2px 0px var(--text-dark);
        }

        .product-description {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 1.25rem;
          line-height: 1.4;
          flex-grow: 1;
        }

        .customization-area {
          margin-bottom: 1.25rem;
        }

        .custom-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .optional-text {
          font-weight: 400;
          color: #777;
          text-transform: none;
        }

        .custom-input {
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          border: var(--border-medium);
          border-radius: 8px;
        }

        .custom-input:focus {
          box-shadow: 3px 3px 0px var(--bg-yellow);
        }

        .product-add-btn {
          margin-top: auto;
          justify-content: center;
          padding: 0.75rem;
          font-size: 1rem;
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </article>
  );
}
