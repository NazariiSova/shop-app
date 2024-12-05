import React from 'react';
import { Product } from '../../types/interfaces';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => (
  <div className="product-item">
    <img src={product.imageUrl} alt={product.name} />
    <h3>{product.name}</h3>
    <p>Count: {product.count}</p>
    <p>Size: {product.size.width}x{product.size.height}</p>
    <p>Weight: {product.weight}</p>
    <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
  </div>
);

export default ProductItem;
