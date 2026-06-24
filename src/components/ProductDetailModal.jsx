import React, { useState, useEffect } from 'react';
import mascotSeal from '../assets/Piklu.png';
import pixelatedFrame4x6 from '../assets/pixelated-frame-4x6.png';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, allProducts, cartCount, onCartClick, onSelectProduct }) {
  const [customValues, setCustomValues] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(product);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [errors, setErrors] = useState({});
  const [slideLoaded, setSlideLoaded] = useState({});

  // Sync active product when the modal is opened/swapped
  useEffect(() => {
    if (product) {
      setActiveProduct(product);
      setCustomValues({});
      setErrors({});
      setActiveSlide(0);
      setSlideLoaded({});
      const defaultVar = product.varieties?.options?.find(opt => opt.isDefault) || product.varieties?.options?.[0] || null;
      setSelectedVariety(defaultVar);
      // Scroll to top of modal overlay when product opens
      document.getElementById('modal-overlay-viewport')?.scrollTo({ top: 0 });
    }
  }, [product]);

  // Sync active product changes (when clicking recommendations inside the modal)
  useEffect(() => {
    if (activeProduct) {
      const defaultVar = activeProduct.varieties?.options?.find(opt => opt.isDefault) || activeProduct.varieties?.options?.[0] || null;
      setSelectedVariety(defaultVar);
      setCustomValues({});
      setErrors({});
      setSlideLoaded({});
    }
  }, [activeProduct]);

  if (!isOpen || !activeProduct) return null;

  // Get active image based on product and selected variety
  const getProductImage = () => {
    if (selectedVariety && selectedVariety.image) {
      return selectedVariety.image;
    }
    // Backward compatibility for existing hardcoded frame image swap
    if (activeProduct.id === 'pixelated-frame' && selectedVariety && selectedVariety.id === '4x6') {
      return pixelatedFrame4x6;
    }
    return activeProduct.image;
  };

  // Build carousel slides dynamically
  const slides = [
    { type: 'main', image: getProductImage(), label: 'Product View' },
    { type: 'detail', image: getProductImage(), label: 'Detail Zoom', zoom: true },
    { type: 'brand', image: mascotSeal, label: 'Handcrafted Seal' }
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleAdd = () => {
    let parts = [];
    let finalProduct = { ...activeProduct };

    if (selectedVariety) {
      parts.push(`[${activeProduct.varieties.label || 'Option'}: ${selectedVariety.name}]`);
      finalProduct.price = selectedVariety.price;
      finalProduct.name = `${activeProduct.name} (${selectedVariety.name})`;
    }

    parts.push("Details on WhatsApp");

    const finalCustomText = parts.join(' ');
    onAddToCart(finalProduct, finalCustomText);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  // Get recommendations: other products in the same category
  const recommendations = allProducts
    .filter((p) => p.category === activeProduct.category && p.id !== activeProduct.id)
    .slice(0, 3); // Get top 3

  // If not enough in same category, get any other products
  if (recommendations.length < 3) {
    const extraRecs = allProducts
      .filter((p) => p.id !== activeProduct.id && !recommendations.find(r => r.id === p.id))
      .slice(0, 3 - recommendations.length);
    recommendations.push(...extraRecs);
  }

  const handleSelectRecommendation = (newProd) => {
    if (onSelectProduct) {
      onSelectProduct(newProd);
    } else {
      setActiveProduct(newProd);
      setActiveSlide(0);
      document.getElementById('modal-overlay-viewport')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="modal-backdrop-overlay" id="modal-overlay-viewport">
      <div className="modal-container">
        {/* Navigation Bar / Back button */}
        <div className="modal-nav-bar">
          <button className="neo-btn neo-btn-pink back-to-shop-btn" onClick={onClose}>
            <span>← Back to Collection</span>
          </button>
          
          <div className="nav-bar-logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {onCartClick && (
              <button 
                onClick={onCartClick} 
                className="neo-btn neo-btn-pink cart-toggle-btn"
                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
              >
                <span>🛒 Cart ({cartCount})</span>
              </button>
            )}
            <span className="logo-text">Piklu<span className="logo-dot">.co</span></span>
          </div>
        </div>

        <div className="modal-grid">
          {/* Left Column: Huge Carousel */}
          <div className="modal-visual-column">
            <div className="carousel-container neo-card">
              <div className="carousel-slides-wrapper">
                {slides.map((slide, index) => (
                  <div 
                    key={index}
                    className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
                  >
                    <div className={`slide-img-container ${slide.zoom ? 'macro-zoom' : ''}`}>
                      <img 
                        src={slide.image} 
                        alt={slide.label} 
                        className={`slide-image ${slideLoaded[index] ? 'loaded' : ''}`} 
                        onLoad={() => setSlideLoaded(prev => ({ ...prev, [index]: true }))}
                      />
                    </div>
                    <span className="slide-label neo-badge">{slide.label}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <button onClick={handlePrevSlide} className="carousel-control prev-control" aria-label="Previous slide">
                ◀
              </button>
              <button onClick={handleNextSlide} className="carousel-control next-control" aria-label="Next slide">
                ▶
              </button>

              {/* Slide indicators */}
              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`indicator-dot ${index === activeSlide ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Info */}
          <div className="modal-info-column">
            <div className="modal-product-header">
              <span className="modal-category-badge neo-badge">{activeProduct.category}</span>
              <h1 className="modal-product-title">{activeProduct.name}</h1>
              <div className="modal-price-tag">
                ₹{selectedVariety ? selectedVariety.price : activeProduct.price}
              </div>
            </div>

            <div className="modal-description-card neo-card">
              <h4>About this Gift 🎁</h4>
              <p className="modal-product-desc">{activeProduct.description}</p>
            </div>

            {/* Dynamic Variety Selection */}
            {activeProduct.varieties && (
              <div className="modal-variety-section neo-card">
                <label className="modal-custom-label">{activeProduct.varieties.label || 'Select Option'}</label>
                <div className="variety-buttons" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
                  {activeProduct.varieties.options.map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setSelectedVariety(opt)}
                      className={`variety-btn neo-btn ${selectedVariety?.id === opt.id ? 'active-variety' : 'neo-btn-pink'}`}
                      style={{ flex: 'unset' }}
                    >
                      <span>{opt.name} (₹{opt.price})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Details Banner */}
            <div className="modal-customization-section neo-card" style={{ backgroundColor: 'var(--bg-yellow)', border: 'var(--border-thick)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🎨 Customization Info
              </h4>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: '1.4' }}>
                No customization details needed here! You will share your custom names, text, links, or photos directly with us on WhatsApp after checking out.
              </p>
            </div>

            {/* Dynamic Specifications */}
            {activeProduct.specifications && activeProduct.specifications.length > 0 && (
              <div className="modal-highlights-card neo-card">
                <h4>Product Highlights ✨</h4>
                <div className="highlights-grid">
                  {activeProduct.specifications.map((spec, i) => (
                    <div key={i} className="highlight-item">
                      <strong>{spec.name}:</strong> <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic FAQs */}
            {activeProduct.faqs && activeProduct.faqs.length > 0 && (
              <div className="modal-highlights-card neo-card" style={{ marginTop: '0.5rem' }}>
                <h4 style={{ marginBottom: '1.25rem' }}>Product FAQs ❓</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeProduct.faqs.map((faq, i) => (
                    <div key={i} style={{ borderBottom: i < activeProduct.faqs.length - 1 ? '1px dashed #ddd' : 'none', paddingBottom: '0.75rem' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>Q: {faq.q}</h5>
                      <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.4 }}>A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleAdd}
              className={`neo-btn w-full modal-add-btn ${isAdded ? 'neo-btn-pink' : 'neo-btn-dark'}`}
            >
              {isAdded ? 'Successfully Added to Cart! 🥳' : 'Add to Cart 🛒'}
            </button>
          </div>

          {/* Footer Row: Recommendations */}
          <div className="modal-recommendations-row">
            <h3 className="rec-heading">You might also love... 💖</h3>
            <div className="rec-grid">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  onClick={() => handleSelectRecommendation(rec)}
                  className="neo-card rec-mini-card"
                >
                  <img src={rec.image} alt={rec.name} className="rec-mini-img" loading="lazy" />
                  <div className="rec-mini-details">
                    <h4 className="rec-mini-title">{rec.name}</h4>
                    <span className="rec-mini-price">₹{rec.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-cream);
          z-index: 1010;
          overflow-y: auto;
          padding: 0;
          display: block;
        }

        .modal-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlideUp {
          0% { transform: translateY(60px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .modal-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px dashed var(--bg-dark);
          padding-bottom: 1.5rem;
          margin-bottom: 1rem;
        }

        .back-to-shop-btn {
          font-size: 0.95rem;
          padding: 0.6rem 1.2rem;
        }

        .nav-bar-logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--text-dark);
          text-shadow: 1.5px 1.5px 0px var(--bg-yellow);
          letter-spacing: -0.5px;
        }

        .logo-dot {
          color: var(--bg-orange);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
        }

        /* Large Carousel Styles */
        .modal-visual-column {
          display: flex;
          flex-direction: column;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 480px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: var(--shadow-flat);
          border: var(--border-thick);
          border-radius: 24px;
        }

        .carousel-slides-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-slide.active {
          opacity: 1;
          visibility: visible;
        }

        .slide-img-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background-color: var(--bg-cream);
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }

        .slide-image.loaded {
          opacity: 1;
        }

        .macro-zoom .slide-image {
          object-position: center;
          transform: scale(1.4);
        }

        .slide-label {
          position: absolute;
          top: 16px;
          left: 16px;
          box-shadow: 2px 2px 0px var(--text-dark);
          background-color: var(--bg-yellow);
          color: var(--text-dark);
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: var(--border-medium);
          background-color: #ffffff;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
          box-shadow: 2.5px 2.5px 0px var(--text-dark);
          z-index: 5;
        }

        .carousel-control:hover {
          background-color: var(--bg-yellow);
          transform: translateY(-50%) scale(1.05);
        }

        .prev-control { left: 16px; }
        .next-control { right: 16px; }

        .carousel-indicators {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: var(--border-medium);
          background-color: #ffffff;
          padding: 0;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .indicator-dot.active {
          background-color: var(--bg-pink);
          transform: scale(1.25);
        }

        /* Product Details Panel */
        .modal-info-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-product-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-category-badge {
          align-self: flex-start;
          font-size: 0.8rem;
          background-color: var(--bg-teal);
          color: var(--text-dark);
        }

        .modal-product-title {
          font-size: 1.8rem;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .modal-price-tag {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.8rem;
          background-color: var(--bg-yellow);
          border: var(--border-thick);
          padding: 0.3rem 1rem;
          border-radius: 12px;
          align-self: flex-start;
          box-shadow: var(--shadow-btn-hover);
          margin-top: 0.25rem;
        }

        .modal-description-card {
          padding: 1.25rem;
          background-color: #ffffff;
          box-shadow: 3px 3px 0px var(--text-dark);
          border-radius: 16px;
        }

        .modal-description-card h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-product-desc {
          font-size: 1rem;
          color: #444;
          line-height: 1.5;
        }

        .modal-customization-section {
          padding: 1.25rem;
          background-color: #ffffff;
          box-shadow: 3px 3px 0px var(--text-dark);
          border-radius: 16px;
        }

        .modal-custom-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-add-btn {
          padding: 1.1rem;
          font-size: 1.15rem;
          justify-content: center;
        }

        /* Recommendations */
        .modal-recommendations-row {
          grid-column: 1 / -1;
          border-top: 2px dashed var(--bg-dark);
          padding-top: 2rem;
          margin-top: 1.5rem;
        }

        .rec-heading {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .rec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .rec-mini-card {
          display: flex;
          padding: 0.75rem;
          gap: 1rem;
          background-color: #ffffff;
          align-items: center;
          cursor: pointer;
          box-shadow: 3px 3px 0px var(--text-dark);
          border-radius: 20px;
        }

        .rec-mini-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0px var(--text-dark);
        }

        .rec-mini-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 12px;
          border: var(--border-medium);
          background-color: var(--bg-cream);
        }

        .rec-mini-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .rec-mini-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.25rem;
        }

        .rec-mini-price {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--bg-orange);
        }

        .modal-variety-section {
          padding: 1.25rem;
          background-color: #ffffff;
          box-shadow: 3px 3px 0px var(--text-dark);
          border-radius: 16px;
        }

        .variety-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .variety-btn {
          flex: 1;
          font-size: 0.9rem;
          padding: 0.6rem 1rem;
          justify-content: center;
        }

        .active-variety {
          background-color: var(--bg-dark) !important;
          color: var(--bg-yellow) !important;
          transform: translate(2px, 2px);
          box-shadow: 0px 0px 0px #1E1E1E !important;
        }

        .modal-highlights-card {
          padding: 1.25rem;
          background-color: #ffffff;
          box-shadow: 3px 3px 0px var(--text-dark);
          border-radius: 16px;
        }

        .modal-highlights-card h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem 1.5rem;
        }

        .highlight-item {
          font-size: 0.9rem;
          line-height: 1.4;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #ddd;
          padding-bottom: 0.25rem;
        }

        .highlight-item strong {
          color: #555;
        }

        .highlight-item span {
          color: var(--text-dark);
          font-weight: 600;
        }

        @media (max-width: 991px) {
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .carousel-container {
            height: 380px;
          }
        }

        @media (max-width: 768px) {
          .carousel-container {
            height: 300px;
          }
          .rec-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .modal-container {
            padding: 1.5rem 1rem;
          }
          .modal-product-title {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </div>
  );
}
