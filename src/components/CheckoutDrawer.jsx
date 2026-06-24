import { useState } from 'react';

// Configure the default merchant WhatsApp number here (Indian country code 91)
const MERCHANT_PHONE = '916204314594'; 

export default function CheckoutDrawer({ isOpen, onClose, cart, onUpdateQty, onRemoveItem }) {
  const [formData, setFormData] = useState(() => {
    try {
      const savedDetails = localStorage.getItem('piklu_customer_details');
      return savedDetails ? JSON.parse(savedDetails) : { name: '', contact: '', address: '' };
    } catch (e) {
      console.error('Failed to load shipping details from localStorage', e);
      return { name: '', contact: '', address: '' };
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error if any
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else {
      // Basic 10 digit check
      const phoneClean = formData.contact.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        newErrors.contact = 'Please enter a valid 10-digit contact number';
      }
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Shipping Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      localStorage.setItem('piklu_customer_details', JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save shipping details to localStorage', err);
    }

    // Build the checkout message matching the exact format requested
    let messageText = `👋 *Hi Piklu.co! I'd like to place an order.*\n\n`;
    
    messageText += `👤 *CUSTOMER DETAILS:*\n`;
    messageText += `• Name: ${formData.name.trim()}\n`;
    messageText += `• Contact: ${formData.contact.trim()}\n`;
    messageText += `• Address: ${formData.address.trim()}\n\n`;
    
    messageText += `🛒 *ORDER DETAILS:*\n`;
    cart.forEach(item => {
      messageText += `• ${item.name} x ${item.qty} — ₹${item.price * item.qty}\n`;
      if (item.customization && item.customization.trim() !== '') {
        messageText += `  (Customization: "${item.customization.trim()}")\n`;
      }
    });
    messageText += `\n`;
    
    messageText += `💰 *TOTAL CART VALUE:* ₹${calculateSubtotal()}\n\n`;
    messageText += `📍 *Please share payment and delivery confirmation steps!*`;

    // Construct the WhatsApp URL
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${MERCHANT_PHONE}?text=${encodedMessage}`;

    // Perform redirect
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Drawer Backdrop Overlay */}
      <div 
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className={`drawer-content ${isOpen ? 'open' : ''}`} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Shopping Cart</h2>
          <button onClick={onClose} className="neo-btn neo-btn-pink close-drawer-btn" aria-label="Close Cart">
            ✕
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-message">
              <span className="cart-empty-icon">🛒</span>
              <h3>Your cart is empty!</h3>
              <p>Go to the catalog and add some beautiful customized gifts to get started.</p>
              <button onClick={onClose} className="neo-btn neo-btn-yellow return-shop-btn">
                Browse Gifts
              </button>
            </div>
          ) : (
            <>
              {/* Part 1: Cart Items List */}
              <div className="cart-items-list">
                <h3 className="drawer-section-heading">Selected Gifts ({cart.length})</h3>
                {cart.map((item) => (
                  <div key={`${item.id}-${item.customization}`} className="neo-card cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id, item.customization)}
                          className="cart-item-remove-btn" 
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="cart-item-price-info">
                        <span className="cart-item-price">₹{item.price}</span>
                      </div>
                      
                      {item.customization && (
                        <div className="cart-item-customization">
                          <strong>Customization:</strong> "{item.customization}"
                        </div>
                      )}
                      
                      <div className="cart-item-quantity-controls">
                        <button 
                          onClick={() => onUpdateQty(item.id, item.customization, item.qty - 1)}
                          className="qty-btn"
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.customization, item.qty + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                        <span className="item-subtotal">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Part 2: Checkout Details Form */}
              <form onSubmit={handleCheckout} className="checkout-form-container">
                <h3 className="drawer-section-heading">Checkout Details</h3>
                
                <div className="form-group">
                  <label htmlFor="name-input" className="form-label">Full Name *</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    className={`neo-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-input" className="form-label">Contact Number *</label>
                  <input
                    id="contact-input"
                    type="tel"
                    name="contact"
                    className={`neo-input ${errors.contact ? 'input-error' : ''}`}
                    placeholder="e.g. 9876543210"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                  {errors.contact && <span className="error-text">{errors.contact}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address-input" className="form-label">Shipping Address *</label>
                  <textarea
                    id="address-input"
                    name="address"
                    rows="3"
                    className={`neo-input textarea-input ${errors.address ? 'input-error' : ''}`}
                    placeholder="Enter your complete delivery address with PIN code"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                {/* Subtotal & Action */}
                <div className="drawer-footer-sticky">
                  <div className="cart-total-section">
                    <span>Subtotal</span>
                    <span className="total-value">₹{calculateSubtotal()}</span>
                  </div>
                  <button type="submit" className="neo-btn neo-btn-orange w-full checkout-submit-btn">
                    <span>Place Order via WhatsApp 🚀</span>
                  </button>
                  <p className="checkout-note">No payment gateway redirect. Chat, customize, and finalize payment directly on WhatsApp!</p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: var(--border-thick);
          background-color: var(--bg-yellow);
        }

        .drawer-title {
          font-size: 1.6rem;
          margin: 0;
        }

        .close-drawer-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 1.2rem;
          border-radius: 50%;
        }

        .drawer-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cart-empty-message {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .cart-empty-icon {
          font-size: 4rem;
        }

        .cart-empty-message h3 {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }

        .cart-empty-message p {
          color: #555;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .return-shop-btn {
          font-size: 1rem;
          padding: 0.65rem 1.5rem;
        }

        .drawer-section-heading {
          font-size: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: var(--border-medium);
          padding-bottom: 0.5rem;
          font-family: var(--font-heading);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cart-item {
          display: flex;
          padding: 0.75rem;
          gap: 1rem;
          background: #ffffff;
          box-shadow: 2px 2px 0px #1e1e1e;
        }

        .cart-item:hover {
          transform: none; /* No hover lift for cart items to avoid jitter */
          box-shadow: 2px 2px 0px #1e1e1e;
        }

        .cart-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          border: var(--border-medium);
          background-color: var(--bg-cream);
        }

        .cart-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cart-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .cart-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .cart-item-remove-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: transform 0.2s ease;
          padding: 2px;
        }

        .cart-item-remove-btn:hover {
          transform: scale(1.2);
        }

        .cart-item-price-info {
          font-size: 0.85rem;
          font-weight: 500;
          color: #444;
          margin-top: 0.25rem;
        }

        .cart-item-customization {
          font-size: 0.8rem;
          background: var(--bg-cream);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          border: 1px dashed var(--bg-dark);
          margin-top: 0.5rem;
          color: #333;
        }

        .cart-item-quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: var(--border-medium);
          background: var(--bg-cream);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .qty-btn:hover:not(:disabled) {
          background: var(--bg-yellow);
        }

        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .qty-value {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .item-subtotal {
          margin-left: auto;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
        }

        .checkout-form-container {
          background-color: var(--bg-cream);
          border-top: var(--border-thick);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .textarea-input {
          resize: vertical;
          min-height: 80px;
        }

        .input-error {
          border-color: var(--bg-orange);
          box-shadow: 3px 3px 0px var(--bg-orange);
        }

        .error-text {
          font-size: 0.75rem;
          color: var(--bg-orange);
          font-weight: 700;
        }

        .cart-total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          border-top: 2px dashed var(--bg-dark);
          padding-top: 1.25rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.4rem;
        }

        .total-value {
          background-color: var(--bg-yellow);
          border: var(--border-thick);
          padding: 0.2rem 0.75rem;
          border-radius: 12px;
          box-shadow: var(--shadow-btn);
        }

        .checkout-submit-btn {
          justify-content: center;
          font-size: 1.1rem;
          padding: 0.9rem;
        }

        .checkout-note {
          font-size: 0.75rem;
          color: #666;
          text-align: center;
          margin-top: 0.5rem;
          line-height: 1.3;
        }
      `}</style>
    </>
  );
}
