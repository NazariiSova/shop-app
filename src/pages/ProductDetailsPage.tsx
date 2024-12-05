import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/productsSlice';
import { RootState, AppDispatch } from '../redux/store';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((p) => p.id === parseInt(id || '', 10));

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Count: {product.count}</p>
      <p>Size: {product.size.width} x {product.size.height}</p>
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
    </div>
  );
};

export default ProductDetailsPage;
