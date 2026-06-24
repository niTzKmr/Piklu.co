import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailModal from './ProductDetailModal';
import ProductNotFound from './ProductNotFound';

export default function ProductPage({ products, onAddToCart, cartCount, onCartClick }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug or id
  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <ProductDetailModal
      key={product.id}
      product={product}
      isOpen={true}
      onClose={() => navigate('/')}
      onAddToCart={onAddToCart}
      allProducts={products}
      cartCount={cartCount}
      onCartClick={onCartClick}
      onSelectProduct={(newProd) => navigate(`/product/${newProd.slug || newProd.id}`)}
    />
  );
}
