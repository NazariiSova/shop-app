import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/features/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Product } from '../../types/interfaces';
import ProductItem from '../products/ProductItem';
import Button from '../common/Button';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Delete product?')) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>List of products</h1>
      <Button text="Add product" onClick={() => {/* modal */}} />
      <div>
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
