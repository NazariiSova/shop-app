import React from 'react';
import { Product } from '../../types/interfaces';

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => (
  <div className="product-item">
    <img src={product.imageUrl} alt={product.name} />
    <h3>{product.name}</h3>
    <p>Count: {product.count}</p>
    <p>Size: {product.size.width}x{product.size.height}</p>
    <p>Weight: {product.weight}</p>
    <button onClick={() => onDelete(product.id)}>Delete</button>
  </div>
);

export default ProductItem;
