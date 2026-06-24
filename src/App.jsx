import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CheckoutDrawer from './components/CheckoutDrawer';
import PixelatedShowcase from './components/PixelatedShowcase';
import ProductPage from './components/ProductPage';
import ProductNotFound from './components/ProductNotFound';
import { products } from './data/products';

import pikluMascot from './assets/Piklu.png';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Recommended');
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.slug || product.id}`);
  };

  // Add an item to the cart
  const handleAddToCart = (product, customizationText) => {
    setCart((prevCart) => {
      // Find if item already exists with the SAME product ID and SAME customization text
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.customization === customizationText
      );

      if (existingItemIndex > -1) {
        // If exists, copy cart and increment quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          qty: newCart[existingItemIndex].qty + 1
        };
        return newCart;
      } else {
        // If new, append item
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
            customization: customizationText
          }
        ];
      }
    });
  };

  // Update item quantity inside the cart
  const handleUpdateQty = (productId, customizationText, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.customization === customizationText
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  // Remove an item from the cart
  const handleRemoveItem = (productId, customizationText) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.customization === customizationText)
      )
    );
  };

  // Get total count of items in the cart
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="store-layout">
      {/* 1. Navbar / Header */}
      <Header 
        cartCount={getCartCount()} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <Routes>
        <Route path="/" element={
          <>
            {/* 2. Hero Section */}
            <Hero onSelectCategory={(category) => {
              setActiveCategory(category);
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Special Pixelated Collection Showcase */}
            <PixelatedShowcase 
              products={products}
              onViewDetails={handleViewDetails}
            />

            {/* 3. Product Catalog Grid */}
            <ProductCatalog 
              products={products} 
              onAddToCart={handleAddToCart} 
              onViewDetails={handleViewDetails}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* 4. Brand Story Section ("Our Story") */}
            <section className="story-section section-yellow" id="story">
              <div className="container story-grid">
                <div className="story-visual animate-float">
                  <div className="story-sticker neo-card">
                    <img src={pikluMascot} alt="Piklu Mascot Mascot" className="story-img" />
                    <div className="sticker-tag">100% Unique</div>
                  </div>
                </div>
                
                <div className="story-content">
                  <h2 className="story-title">Crafting Smiles Since 2024 🧸</h2>
                  <p className="story-desc">
                    Piklu.co started with a simple belief: <strong>gifts should mean something</strong>. No more boring corporate mugs or generic greeting cards. We specialize in adding a pinch of playfulness and customization to high-quality hampers and handmade accessories.
                  </p>
                  <p className="story-desc">
                    Every single hamper is carefully hand-packed, and every keychain is engraved with extreme precision in our studio. We work directly with you to craft the perfect surprise, communicating through WhatsApp at each step to ensure your gift looks exactly how you imagined it!
                  </p>
                  
                  <div className="story-stats">
                    <div className="stat-card neo-card">
                      <h4>5000+</h4>
                      <p>Hampers Delivered</p>
                    </div>
                    <div className="stat-card neo-card">
                      <h4>100%</h4>
                      <p>Happy Reactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. FAQs / Brand Values Section */}
            <section className="faq-section" id="faq">
              <div className="container">
                <h2 className="section-heading text-center">Frequently Asked Questions</h2>
                <div className="faq-grid">
                  <div className="faq-item neo-card">
                    <h4>📦 How does checkout work?</h4>
                    <p>When you click checkout, we compile your order and customer details into a customized WhatsApp template. You will be redirected to WhatsApp to chat with us directly, finalize customization proofs, and share your payment confirmation!</p>
                  </div>
                  
                  <div className="faq-item neo-card">
                    <h4>🎨 Can I customize the hamper contents?</h4>
                    <p>Yes, absolutely! Since checkout leads directly to our WhatsApp chat, you can ask us to add, remove, or swap items. We love making your hampers feel truly custom.</p>
                  </div>

                  <div className="faq-item neo-card">
                    <h4>⏰ How long does delivery take?</h4>
                    <p>Custom keychains and mugs take 2–3 business days to design and craft. Curated hampers are dispatched within 24 hours. Transit takes 3–5 business days across India.</p>
                  </div>

                  <div className="faq-item neo-card">
                    <h4>💳 What are the payment methods?</h4>
                    <p>We accept UPI, Google Pay, PhonePe, Paytm, and bank transfers. We will share our payment credentials and QR codes during our WhatsApp conversation!</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        } />

        <Route path="/product/:slug" element={
          <ProductPage 
            products={products}
            onAddToCart={handleAddToCart}
            cartCount={getCartCount()}
            onCartClick={() => setIsCartOpen(true)}
          />
        } />

        <Route path="*" element={<ProductNotFound />} />
      </Routes>

      {/* 6. Footer */}
      <footer className="footer-section" id="contact">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Piklu<span className="logo-dot">.co</span></h3>
            <p>Thoughtful gifting, handcrafted with love. ❤️</p>
          </div>
          
          <div className="footer-links">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://instagram.com/Piklu.co" target="_blank" rel="noopener noreferrer" className="social-link">Instagram: @Piklu.co 📸</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-link">Pinterest 📌</a>
              <a href="mailto:piklu.co2@gmail.com" className="social-link">Email: piklu.co2@gmail.com ✉️</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Piklu.co. All Rights Reserved. Built with Neo-Brutalist Love.</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="neo-btn neo-btn-pink footer-top-btn"
            >
              Back to Top 🔝
            </button>
          </div>
        </div>
      </footer>

      {/* 7. Interactive Checkout Drawer */}
      <CheckoutDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
      />

      <style>{`
        .store-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .text-center {
          text-align: center;
        }

        .section-heading {
          font-size: 2.8rem;
          margin-bottom: 3.5rem;
          letter-spacing: -1px;
        }

        /* Story Section styles */
        .story-section {
          padding: 6rem 0;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .story-visual {
          display: flex;
          justify-content: center;
        }

        .story-sticker {
          position: relative;
          background: #ffffff;
          padding: 1rem;
          width: 280px;
          height: 280px;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-img {
          width: 90%;
          height: 90%;
          object-fit: cover;
          border-radius: 20px;
          border: var(--border-medium);
        }

        .sticker-tag {
          position: absolute;
          bottom: -15px;
          right: -15px;
          background-color: var(--bg-orange);
          color: var(--text-light);
          border: var(--border-medium);
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: 2px 2px 0px var(--text-dark);
          transform: rotate(6deg);
        }

        .story-title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }

        .story-desc {
          font-size: 1.05rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .story-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .stat-card {
          flex: 1;
          background: #ffffff;
          padding: 1.25rem;
          text-align: center;
          box-shadow: 3px 3px 0px var(--text-dark);
        }

        .stat-card h4 {
          font-size: 2rem;
          color: var(--bg-orange);
          margin-bottom: 0.25rem;
        }

        .stat-card p {
          font-size: 0.9rem;
          font-weight: 700;
        }

        /* FAQ Section styles */
        .faq-section {
          padding: 6rem 0;
          background-color: var(--bg-cream);
          border-bottom: var(--border-thick);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-item {
          padding: 1.75rem;
          background: #ffffff;
        }

        .faq-item h4 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .faq-item p {
          font-size: 0.95rem;
          color: #444;
        }

        /* Footer styles */
        .footer-section {
          background-color: var(--bg-dark);
          color: var(--text-light);
          padding: 4rem 0 2rem 0;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .footer-logo {
          color: var(--text-light);
          font-size: 2.2rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 0px var(--bg-orange);
        }

        .footer-brand p {
          color: #ccc;
          max-width: 320px;
        }

        .footer-links h4 {
          color: var(--text-light);
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-link {
          color: var(--bg-pink);
          text-decoration: none;
          font-weight: 700;
          font-family: var(--font-heading);
          transition: var(--transition-smooth);
          align-self: flex-start;
        }

        .social-link:hover {
          color: var(--bg-yellow);
          transform: translateX(4px);
        }

        .footer-bottom {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #444;
          padding-top: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-bottom p {
          color: #999;
          font-size: 0.85rem;
        }

        .footer-top-btn {
          font-size: 0.85rem;
          padding: 0.4rem 1rem;
        }

        @media (max-width: 991px) {
          .story-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          
          .story-visual {
            order: -1;
          }
          
          .story-stats {
            justify-content: center;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
