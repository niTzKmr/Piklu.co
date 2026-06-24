import React, { useState, useEffect } from 'react';
import heroMascot from '../assets/Piklu.jpg';

export default function Hero({ onSelectCategory }) {
  const handleScrollToCatalog = (e) => {
    e.preventDefault();
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shuffleItems = [
    { text: 'Customize a Keychain 🔑', category: 'Keychain' },
    { text: 'Customize a Frame 🖼️', category: 'Frame' },
    { text: 'Customize a Hamper 🎁', category: 'Hamper' },
    { text: 'Customize a Mug ☕', category: 'Mug' },
    { text: 'Customize a Bracelet 📿', category: 'Bracelet' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffleItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentItem = shuffleItems[currentIndex];

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            Because Your <span className="title-accent-italic">Beloved</span> Deserves the <span className="title-accent-pixel">Perfect Piklu Gift</span> ✨
          </h1>
          <p className="hero-tagline">
            Unbox happiness and share the love. From hand-crafted curated hampers to completely personalized keychains, we pack love into every single box to make your special moments absolutely unforgettable.
          </p>
          <div className="hero-actions">
            <a
              href="#pixel-collection"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pixel-collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="neo-btn neo-btn-dark hero-cta"
            >
              <span>Special Collection 🕹️</span>
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onSelectCategory) {
                  onSelectCategory(currentItem.category);
                }
              }}
              className="neo-btn neo-btn-yellow hero-secondary-btn"
            >
              <span key={currentIndex} className="shuffle-text">
                {currentItem.text}
              </span>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper neo-card animate-float">
            <img src={heroMascot} alt="Piklu Gifting Hamper & Mascot" className="hero-main-img" />
            <div className="floating-bubble-1 neo-card">
              <span>💖 Curated with Love</span>
            </div>
            <div className="floating-bubble-2 neo-card">
              <span>₹299 onwards!</span>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="star-shape shape-1 animate-spin-slow">✦</div>
          <div className="star-shape shape-2">✦</div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="wave-container">
        <div className="crt-scanlines crt-scanlines-wave"></div>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="wave-svg">
          <path
            className="wave-path"
            d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
          <path
            className="wave-line-path"
            d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64"
          ></path>
        </svg>
      </div>

      <style>{`
        .hero-section {
          background-color: var(--bg-pink);
          padding-top: 5rem;
          padding-bottom: 0;
          position: relative;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 2;
          padding-bottom: 6rem;
        }

        .hero-badge-container {
          margin-bottom: 1.25rem;
        }

        .hero-badge {
          font-size: 0.9rem;
          padding: 0.4rem 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: 3.8rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -1.5px;
          text-shadow: 3px 3px 0px #ffffff;
        }

        .title-accent-italic {
          font-family: var(--font-body);
          font-style: italic;
          font-weight: 700;
          color: var(--bg-orange);
          text-shadow: 2px 2px 0px #ffffff;
        }

        .title-accent-pixel {
          font-family: var(--font-pixel);
          font-size: 0.55em;
          color: #39FF14;
          background-color: #2C1A47;
          padding: 0.25rem 0.75rem;
          border: 3px solid var(--text-dark);
          text-shadow: 2px 2px 0px #FF007F;
          display: inline-block;
          vertical-align: middle;
          margin: 0.25rem 0.5rem;
          letter-spacing: 0px;
          transform: rotate(-1.5deg);
          line-height: 1.2;
        }

        .hero-tagline {
          font-size: 1.25rem;
          color: var(--text-dark);
          margin-bottom: 2.5rem;
          max-width: 580px;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .hero-cta {
          padding: 1rem 2rem;
          font-size: 1.15rem;
        }

        .hero-secondary-btn {
          padding: 1rem 2rem;
          font-size: 1.15rem;
          min-width: 275px;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        @keyframes slideUpFade {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .shuffle-text {
          display: inline-block;
          animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
          padding: 0.75rem;
          background-color: var(--bg-cream);
          border-radius: 32px;
          overflow: visible;
        }

        .hero-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          border: var(--border-medium);
        }

        .floating-bubble-1 {
          position: absolute;
          bottom: 20px;
          left: -60px;
          background-color: var(--bg-yellow);
          padding: 0.6rem 1rem;
          border-radius: 16px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          white-space: nowrap;
          box-shadow: 3px 3px 0px var(--text-dark);
        }

        .floating-bubble-2 {
          position: absolute;
          top: 30px;
          right: -40px;
          background-color: var(--bg-teal);
          padding: 0.6rem 1rem;
          border-radius: 16px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          white-space: nowrap;
          box-shadow: 3px 3px 0px var(--text-dark);
        }

        .star-shape {
          position: absolute;
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--bg-yellow);
          text-shadow: 2px 2px 0px var(--text-dark);
        }

        .shape-1 {
          top: -20px;
          left: 10px;
        }

        .shape-2 {
          bottom: 20px;
          right: 10px;
          color: var(--bg-orange);
        }

        .circle-shape {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: var(--border-medium);
          background-color: var(--bg-teal);
          bottom: -20px;
          left: 50px;
          z-index: -1;
        }

        .wave-container {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .crt-scanlines-wave {
          mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'><path d='M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z' fill='black'/></svg>");
          -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'><path d='M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z' fill='black'/></svg>");
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          z-index: 2;
        }

        .wave-svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 70px;
        }

        .wave-path {
          fill: #2C1A47;
        }

        .wave-line-path {
          fill: none;
          stroke: var(--text-dark);
          stroke-width: 4px;
          vector-effect: non-scaling-stroke;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 4rem;
            padding-bottom: 4rem;
          }

          .hero-tagline {
            margin: 0 auto 2.5rem auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-visual {
            margin-top: 1rem;
          }

          .hero-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-image-wrapper {
            width: 250px;
            height: 250px;
          }
          
          .floating-bubble-1 {
            left: -20px;
          }
          
          .floating-bubble-2 {
            right: -20px;
          }
        }
      `}</style>
    </section>
  );
}
