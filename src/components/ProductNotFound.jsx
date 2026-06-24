import { useNavigate } from 'react-router-dom';

export default function ProductNotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundColor: 'var(--bg-cream)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-body)'
    }}>
      <div className="neo-card" style={{
        padding: '3rem',
        maxWidth: '500px',
        backgroundColor: '#ffffff',
        border: 'var(--border-thick)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-flat)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <span style={{ fontSize: '4rem' }}>😢</span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.2rem',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>Product Not Found</h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#555',
          lineHeight: 1.6,
          margin: 0
        }}>
          We couldn't find the product you're looking for. It might have been removed, or the link is incorrect.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="neo-btn neo-btn-pink"
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
        >
          <span>Back to Home 🏠</span>
        </button>
      </div>
    </div>
  );
}
