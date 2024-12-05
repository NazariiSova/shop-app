import React from 'react';
import { Product } from '../../types/interfaces';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
