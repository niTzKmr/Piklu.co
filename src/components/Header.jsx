import logoImg from '../assets/Piklu.png';

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="header-container">
      <div className="header-bar container">
        <a href="#" className="logo-area">
          <img src={logoImg} alt="Piklu Mascot" className="logo-mascot" />
          <span className="logo-text">Piklu<span className="logo-dot">.co</span></span>
        </a>
        
        <nav className="nav-links">
          <a href="#catalog" className="nav-link">Catalog</a>
          <a href="#story" className="nav-link">Our Story</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <button 
          onClick={onCartClick} 
          key={cartCount}
          className={`neo-btn neo-btn-pink cart-toggle-btn ${cartCount > 0 ? 'pop-effect' : ''}`}
          aria-label="Open Shopping Cart"
          id="cart-toggle-btn"
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          <span className="neo-badge cart-count-badge">{cartCount}</span>
        </button>
      </div>

      <style>{`
        .header-container {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--bg-cream);
          border-bottom: var(--border-thick);
          z-index: 999;
          padding: 0.75rem 0;
        }

        .header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          outline: none;
        }

        .logo-mascot {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: var(--border-medium);
          background-color: var(--bg-pink);
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .logo-area:hover .logo-mascot {
          transform: rotate(12deg) scale(1.1);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.8rem;
          color: var(--text-dark);
          text-shadow: 2px 2px 0px var(--bg-yellow);
          letter-spacing: -0.5px;
        }

        .logo-dot {
          color: var(--bg-orange);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-dark);
          text-decoration: none;
          font-size: 1.05rem;
          position: relative;
          padding: 0.25rem 0;
          transition: var(--transition-smooth);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: var(--bg-orange);
          transition: var(--transition-smooth);
          border-radius: 9999px;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cart-toggle-btn {
          padding: 0.6rem 1.2rem;
          font-size: 0.95rem;
        }

        .cart-count-badge {
          margin-left: 0.25rem;
          transition: var(--transition-smooth);
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2) rotate(-5deg); }
          100% { transform: scale(1); }
        }

        .pop-effect {
          animation: pop 0.3s ease-out;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0.4rem 0; /* Compact vertical padding */
          }

          .nav-links {
            display: none; /* Mobile responsiveness: hide middle links */
          }
          
          .logo-text {
            font-size: 1.25rem; /* More compact logo text */
            text-shadow: 1.5px 1.5px 0px var(--bg-yellow);
          }
          
          .logo-mascot {
            width: 32px; /* More compact mascot */
            height: 32px;
          }

          .cart-toggle-btn {
            font-size: 0.78rem; /* More compact cart font size */
            padding: 0.45rem 0.8rem; /* More compact cart padding */
          }

          .cart-count-badge {
            font-size: 0.7rem; /* Make the cart badge smaller */
            padding: 0.15rem 0.4rem;
          }
        }

        @media (max-width: 320px) {
          .header-bar.container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .logo-text {
            font-size: 1.05rem;
          }
          
          .logo-mascot {
            width: 28px;
            height: 28px;
          }
          
          .logo-area {
            gap: 0.4rem;
          }

          .cart-toggle-btn {
            font-size: 0.7rem;
            padding: 0.4rem 0.6rem;
            border-width: 2px;
            box-shadow: 2px 2px 0px #1E1E1E;
          }
        }
      `}</style>
    </header>
  );
}
