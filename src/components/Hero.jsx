import { useEffect, useState } from 'react';
import heroMascot from '../assets/Piklu.jpg';

const shuffleItems = [
  { text: 'Custom Keychain 🔑', category: 'Keychain' },
  { text: 'Custom Frame 🖼️', category: 'Frame' },
  { text: 'Custom Hamper 🎁', category: 'Hamper' },
];

export default function Hero({ onSelectCategory }) {
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
      {/* Puffy Corner Clouds */}
      <div className="corner-clouds left-clouds">
        <div className="cloud-bubble bubble-1"></div>
        <div className="cloud-bubble bubble-2"></div>
        <div className="cloud-bubble bubble-3"></div>
        <div className="cloud-bubble bubble-4"></div>
        <div className="cloud-deco deco-heart">💖</div>
        <div className="cloud-deco deco-sparkle">✦</div>
      </div>
      
      <div className="corner-clouds right-clouds">
        <div className="cloud-bubble bubble-1"></div>
        <div className="cloud-bubble bubble-2"></div>
        <div className="cloud-bubble bubble-3"></div>
        <div className="cloud-bubble bubble-4"></div>
        <div className="cloud-deco deco-heart">💖</div>
        <div className="cloud-deco deco-sparkle">✦</div>
      </div>

      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line-1">Because Your</span> <span className="title-accent-italic">beloved deserves the</span> <span className="title-accent-highlight">Perfect Piklu Gift</span>
          </h1>
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
              <span>₹99 onwards!</span>
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
          z-index: 3;
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
          font-size: 3.6rem;
          line-height: 1.0;
          margin-bottom: 2rem;
          letter-spacing: -1px;
          text-shadow: none;
          color: var(--text-dark);
        }

        .title-line-1 {
          font-family: pf-pixelscript, sans-serif;
          font-style: normal;
          font-weight: 400;
        }

        .title-accent-italic {
          font-family: var(--font-serif-instrument), serif;
          font-style: italic;
          font-weight: 400;
          color: #ff4d4d;
          display: block;
          font-size: 1.2em; /* Scaled up for narrow elegant Instrument Serif style */
          line-height: 0.95;
          margin-top: -0.23em;
          margin-bottom: -0.12em;
        }

        .title-accent-highlight {
          position: relative;
          display: inline-block;
          font-family: var(--font-pixel);
          font-size: 0.52em;
          letter-spacing: -1px;
          color: var(--text-dark);
          background-color: var(--bg-yellow);
          padding: 0.35em 0.7em;
          border: 3px solid var(--text-dark);
          border-radius: 4px;
          box-shadow: 4px 4px 0px var(--text-dark);
          margin-top: 0.25rem;
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

        /* Layered Puffy Corner Clouds styling */
        .corner-clouds {
          position: absolute;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
          width: 380px;
          height: 200px;
          overflow: visible;
        }

        .left-clouds {
          left: -40px;
        }

        .right-clouds {
          right: -40px;
        }

        .cloud-bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.88);
          border-top: 4px solid #ffffff;
          border-radius: 50%;
          box-shadow: inset 0 -12px 24px rgba(255, 183, 197, 0.4);
        }

        /* Left clouds layout */
        .left-clouds .bubble-1 {
          width: 180px;
          height: 180px;
          bottom: -70px;
          left: 0px;
        }

        .left-clouds .bubble-2 {
          width: 220px;
          height: 220px;
          bottom: -80px;
          left: 100px;
        }

        .left-clouds .bubble-3 {
          width: 145px;
          height: 145px;
          bottom: -45px;
          left: 240px;
        }

        .left-clouds .bubble-4 {
          width: 100px;
          height: 100px;
          bottom: -20px;
          left: 335px;
        }

        /* Right clouds layout */
        .right-clouds .bubble-1 {
          width: 180px;
          height: 180px;
          bottom: -70px;
          right: 0px;
        }

        .right-clouds .bubble-2 {
          width: 220px;
          height: 220px;
          bottom: -80px;
          right: 100px;
        }

        .right-clouds .bubble-3 {
          width: 145px;
          height: 145px;
          bottom: -45px;
          right: 240px;
        }

        .right-clouds .bubble-4 {
          width: 100px;
          height: 100px;
          bottom: -20px;
          right: 335px;
        }

        .cloud-deco {
          position: absolute;
          pointer-events: none;
          animation: float 4s ease-in-out infinite;
        }

        .left-clouds .deco-heart {
          bottom: 110px;
          left: 190px;
          font-size: 1.1rem;
          opacity: 0.85;
          animation-delay: 0.5s;
        }

        .left-clouds .deco-sparkle {
          bottom: 135px;
          left: 95px;
          color: var(--text-dark);
          font-size: 1.3rem;
          text-shadow: 1px 1px 0px #ffffff;
          animation-delay: 1.2s;
        }

        .right-clouds .deco-heart {
          bottom: 110px;
          right: 190px;
          font-size: 1.1rem;
          opacity: 0.85;
          animation-delay: 0.9s;
        }

        .right-clouds .deco-sparkle {
          bottom: 135px;
          right: 95px;
          color: var(--text-dark);
          font-size: 1.3rem;
          text-shadow: 1px 1px 0px #ffffff;
          animation-delay: 0.3s;
        }

        @media (max-width: 576px) {
          .corner-clouds {
            width: 150px;
            height: 100px;
          }
          .left-clouds .bubble-1, .right-clouds .bubble-1 { width: 80px; height: 80px; bottom: -30px; }
          .left-clouds .bubble-2, .right-clouds .bubble-2 { width: 100px; height: 100px; bottom: -35px; left: 40px; right: 40px; }
          .left-clouds .bubble-3, .right-clouds .bubble-3 { width: 70px; height: 70px; bottom: -20px; left: 90px; right: 90px; }
          .left-clouds .bubble-4, .right-clouds .bubble-4 { display: none; }
          .left-clouds .deco-heart, .right-clouds .deco-heart { bottom: 50px; left: 80px; right: 80px; font-size: 0.8rem; }
          .left-clouds .deco-sparkle, .right-clouds .deco-sparkle { bottom: 65px; left: 40px; right: 40px; font-size: 0.9rem; }
        }

        .wave-container {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          z-index: 2;
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

          .title-accent-highlight {
            font-size: 0.44em;
            white-space: nowrap;
            padding: 0.35em 0.5em;
          }

          .hero-actions {
            flex-wrap: nowrap;
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
          }

          .hero-cta, .hero-secondary-btn {
            font-size: 0.74rem;
            padding: 0.75rem 0.5rem;
            min-width: 0;
            flex: 1;
            white-space: nowrap;
            justify-content: center;
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
