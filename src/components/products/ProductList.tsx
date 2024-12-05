import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from '../../redux/features/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Product } from '../../types/interfaces';
import ProductItem from '../products/ProductItem';
import AddProductModal from '../common/AddProductModal';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'name' | 'count'>('name');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.count - a.count;
  });

  const handleAddProduct = (product: {
    name: string;
    count: number;
    weight: string;
    imageUrl: string;
  }) => {
    const newProduct = {
      ...product,
      comments: [],
      size: { width: 0, height: 0 },
    };

    dispatch(addProduct(newProduct));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-list">
      <h1>List of Products</h1>
      <div>
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as 'name' | 'count')}
        >
          <option value="name">Name</option>
          <option value="count">Count</option>
        </select>
      </div>
      <button onClick={() => setAddModalOpen(true)}>Add Product</button>
      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={() => {}} />
        ))}
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;
