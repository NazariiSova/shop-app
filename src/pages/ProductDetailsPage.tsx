import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const [isEditOpen, setEditOpen] = useState(false);

  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <h2>Comments</h2>
      <ul>
        {product.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.description}</p>
            <p>{comment.date}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setEditOpen(true)}>Edit Product</button>
      {/* Add EditProductModal */}
    </div>
  );
};

export default ProductDetailsPage;
