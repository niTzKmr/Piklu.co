import { useState } from 'react';

export default function PixelatedShowcase({ products, onViewDetails }) {
  const [loadedImages, setLoadedImages] = useState({});
  const pixelatedItems = products.filter(p => p.collection === 'pixelated');
  console.log('ALL PRODUCTS:', products);
  console.log('PIXELATED:', pixelatedItems);

  if (pixelatedItems.length === 0) return null;

  return (
    <section className="pixel-section" id="pixel-collection">
      {/* Decorative scanlines overlay for retro TV feel */}
      <div className="crt-scanlines"></div>
      
      <div className="container pixel-grid">
        {/* Left Column: Arcade Branding */}
        <div className="pixel-intro-column">
          <span className="pixel-subtitle">SPECIAL EDITION RELEASE 🕹️</span>
          <h2 className="pixel-title">THE PIXELATED<br />COLLECTION</h2>
          <p className="pixel-desc">
            Level up your gifting game! Introduce retro vibes to your desk or keys with our limited-edition 8-bit themed custom items. Hand-crafted using dual-layered high-contrast acrylics and pixel engraving.
          </p>
          <a 
            href="#catalog" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="pixel-btn-neon"
          >
            <span>VIEW ALL ITEMS [ENTER]</span>
          </a>
        </div>

        {/* Right Column: Mini Grid of 2 Pixelated Items */}
        <div className="pixel-cards-column">
          <div className="pixel-items-grid">
            {pixelatedItems.map((item) => (
              <div 
                key={item.id} 
                className="pixel-card"
                onClick={() => onViewDetails(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pixel-card-img-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`pixel-card-img ${loadedImages[item.id] ? 'loaded' : ''}`} 
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                  />
                </div>
                <div className="pixel-card-body">
                  <h3 className="pixel-card-title">{item.name}</h3>
                  <div className="pixel-card-price">₹{item.price}</div>
                  <button 
                    className="pixel-btn-neon w-full"
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid double action, open the modal to configure
                      onViewDetails(item);
                    }}
                  >
                    <span>SELECT ITEM [A]</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retro background floating pixel shapes */}
      <div className="pixel-float-shape shape-star-1">✦</div>
      <div className="pixel-float-shape shape-star-2">✦</div>
      <div className="pixel-float-shape shape-ghost">👾</div>

      <style>{`
        .pixel-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .pixel-intro-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .pixel-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .pixel-float-shape {
          position: absolute;
          font-family: var(--font-pixel);
          font-size: 2rem;
          color: rgba(57, 255, 20, 0.15); /* Semi-transparent neon green */
          user-select: none;
          pointer-events: none;
          z-index: 1;
        }

        .shape-star-1 {
          top: 15%;
          right: 5%;
          animation: pixelFloat 5s ease-in-out infinite;
        }

        .shape-star-2 {
          bottom: 10%;
          left: 3%;
          color: rgba(255, 0, 127, 0.15);
          animation: pixelFloat 6s ease-in-out infinite alternate;
        }

        .shape-ghost {
          top: 10%;
          left: 45%;
          font-size: 2.5rem;
          animation: pixelGhostFloat 8s ease-in-out infinite;
        }

        @keyframes pixelFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(45deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes pixelGhostFloat {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -20px); }
          100% { transform: translate(0, 0); }
        }

        @media (max-width: 991px) {
          .pixel-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          
          .pixel-intro-column {
            align-items: center;
          }
          
          .pixel-desc {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 576px) {
          .pixel-items-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .pixel-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
